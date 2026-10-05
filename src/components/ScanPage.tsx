import React, { useState, useRef, useEffect } from 'react';
import { PageId } from '../types/medishield';
import { SafetyBanner } from './SafetyBanner';
import { urlToDataUrl, optimizeImageForAnalysis } from '../utils/image';
import {
  Camera,
  Upload,
  RefreshCw,
  Zap,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

interface ScanPageProps {
  onStartAnalysis: (
    imageDataUrl: string,
    testPreset?: 'amoxicillin' | 'ibuprofen' | 'authentic' | 'suspicious' | 'verify'
  ) => void;
  onNavigate: (page: PageId) => void;
  initialPreset?: 'amoxicillin' | 'ibuprofen' | 'authentic' | 'suspicious' | 'verify' | null;
}

export const ScanPage: React.FC<ScanPageProps> = ({
  onStartAnalysis,
  onNavigate,
  initialPreset = null,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'samples'>('camera');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // If initial preset is passed, handle immediately
  useEffect(() => {
    if (initialPreset) {
      let path = '/src/assets/images/sample_pack_authentic_1790841933319.jpg';
      if (initialPreset === 'amoxicillin') {
        path = '/src/assets/images/sample_amoxicillin_1790843268269.jpg';
      } else if (initialPreset === 'ibuprofen') {
        path = '/src/assets/images/sample_ibuprofen_1790843282178.jpg';
      } else if (initialPreset === 'suspicious') {
        path = '/src/assets/images/sample_pack_suspicious_1790841945116.jpg';
      }
      urlToDataUrl(path).then((dataUrl) => setSelectedImage(dataUrl));
      setActiveTab('samples');
    }
  }, [initialPreset]);

  // Start Camera
  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    stopCamera();
    setCameraError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera initiation failed:', err);
      setCameraActive(false);
      setCameraError(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Camera permission was denied. You can easily upload a photo from your gallery instead.'
          : 'Unable to start camera stream. Please use the upload photo option below.'
      );
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Manage camera lifecycle based on activeTab and preview
  useEffect(() => {
    if (activeTab === 'camera' && !selectedImage) {
      startCamera(facingMode);
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab, selectedImage, facingMode]);

  // Toggle Camera Facing Mode (Front / Rear)
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture Photo from Video Stream
  const capturePhoto = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        optimizeImageForAnalysis(dataUrl).then((optimized) => {
          setSelectedImage(optimized);
        });
        stopCamera();
      }
    } catch (e) {
      console.error('Capture failed', e);
    } finally {
      setIsCapturing(false);
    }
  };

  // Handle File Input from Gallery or Camera
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (result) {
        const optimized = await optimizeImageForAnalysis(result);
        setSelectedImage(optimized);
        stopCamera();
      }
    };
    reader.readAsDataURL(file);
  };

  // Select Sample Image
  const handleSelectSample = (
    preset: 'amoxicillin' | 'ibuprofen' | 'authentic' | 'suspicious' | 'verify'
  ) => {
    let path = '/src/assets/images/sample_pack_authentic_1790841933319.jpg';
    if (preset === 'amoxicillin') {
      path = '/src/assets/images/sample_amoxicillin_1790843268269.jpg';
    } else if (preset === 'ibuprofen') {
      path = '/src/assets/images/sample_ibuprofen_1790843282178.jpg';
    } else if (preset === 'suspicious') {
      path = '/src/assets/images/sample_pack_suspicious_1790841945116.jpg';
    }
    urlToDataUrl(path).then((dataUrl) => setSelectedImage(dataUrl));
  };

  const handleRetake = () => {
    setSelectedImage(null);
    if (activeTab === 'camera') {
      startCamera(facingMode);
    }
  };

  const handleProceedAnalysis = () => {
    if (!selectedImage) return;

    // Detect if this is one of our sample presets
    let preset: 'amoxicillin' | 'ibuprofen' | 'authentic' | 'suspicious' | 'verify' | undefined = undefined;
    if (selectedImage.includes('sample_amoxicillin')) {
      preset = 'amoxicillin';
    } else if (selectedImage.includes('sample_ibuprofen')) {
      preset = 'ibuprofen';
    } else if (selectedImage.includes('sample_pack_suspicious')) {
      preset = 'suspicious';
    } else if (initialPreset === 'verify') {
      preset = 'verify';
    }

    onStartAnalysis(selectedImage, preset);
  };

  return (
    <div className="space-y-4 pb-24 max-w-2xl mx-auto px-4 sm:px-6 pt-3">
      {/* Safety Notice */}
      <SafetyBanner compact />

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Step Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">
              {selectedImage ? 'Review Captured Packaging' : 'Capture Medicine Packaging'}
            </h2>
            <p className="text-xs text-slate-500">
              {selectedImage
                ? 'Check that typography and batch numbers are visible before analyzing.'
                : 'Position the packaging under good lighting for accurate text extraction.'}
            </p>
          </div>

          {selectedImage && (
            <button
              onClick={handleRetake}
              className="text-xs text-teal-700 hover:text-teal-800 font-semibold px-2.5 py-1 rounded-lg bg-teal-50 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          )}
        </div>

        {/* If Image is Selected (Preview Mode) */}
        {selectedImage ? (
          <div className="p-4 space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-4/3 flex items-center justify-center border border-slate-800 shadow-inner">
              <img
                src={selectedImage}
                alt="Selected medicine packaging preview"
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md rounded-lg p-2 text-white text-[11px] flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-teal-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Image ready for AI screening
                </span>
                <span className="text-slate-400">High resolution</span>
              </div>
            </div>

            {/* Packaging Checklist Tips */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-xs">
              <span className="font-semibold text-slate-800">
                Packaging Clarity Checklist:
              </span>
              <ul className="space-y-1 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  Medicine name and dosage strength are legible.
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  Batch / Lot number and expiry dates are visible.
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  No excessive camera glare reflecting off foil or plastic.
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleRetake}
                className="min-h-[48px] px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake / Choose Another</span>
              </button>

              <button
                onClick={handleProceedAnalysis}
                className="flex-1 min-h-[48px] px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze Packaging with AI</span>
              </button>
            </div>
          </div>
        ) : (
          /* Capture / Upload Mode */
          <div className="p-4 space-y-4">
            {/* Mode Switch Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => {
                  setActiveTab('camera');
                  setCameraError(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'camera'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Live Camera</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('upload');
                  stopCamera();
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Image</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('samples');
                  stopCamera();
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'samples'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Test Samples</span>
              </button>
            </div>

            {/* TAB 1: LIVE CAMERA VIEW */}
            {activeTab === 'camera' && (
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-4/3 flex items-center justify-center border border-slate-800 shadow-inner">
                  {cameraActive ? (
                    <>
                      <video
                        ref={videoRef}
                        playsInline
                        muted
                        autoPlay
                        className="w-full h-full object-cover"
                      />

                      {/* Viewfinder Target Framing Overlay */}
                      <div className="absolute inset-6 sm:inset-10 border-2 border-white/40 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                        {/* Target Corner Guides */}
                        <div className="flex justify-between">
                          <div className="w-5 h-5 border-t-3 border-l-3 border-teal-400 rounded-tl"></div>
                          <div className="w-5 h-5 border-t-3 border-r-3 border-teal-400 rounded-tr"></div>
                        </div>

                        {/* Animated Scanning Line */}
                        <div className="relative w-full h-0.5 bg-teal-400 shadow-[0_0_8px_#2dd4bf] animate-scanline"></div>

                        <div className="flex justify-between">
                          <div className="w-5 h-5 border-b-3 border-l-3 border-teal-400 rounded-bl"></div>
                          <div className="w-5 h-5 border-b-3 border-r-3 border-teal-400 rounded-br"></div>
                        </div>
                      </div>

                      {/* Instructions Overlay */}
                      <div className="absolute top-3 left-3 right-3 text-center pointer-events-none">
                        <span className="inline-block bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full border border-white/10">
                          Align medicine box or blister pack inside frame
                        </span>
                      </div>

                      {/* Camera Controls inside overlay */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <button
                          onClick={toggleFacingMode}
                          className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg border border-white/20 active:scale-95 transition-all cursor-pointer"
                          title="Switch Camera (Front/Rear)"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center text-slate-300 max-w-sm space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-800 text-teal-400 flex items-center justify-center mx-auto">
                        <Camera className="w-6 h-6" />
                      </div>
                      {cameraError ? (
                        <div className="space-y-2">
                          <p className="text-xs text-amber-300">{cameraError}</p>
                          <div className="flex flex-col gap-2 pt-2">
                            <button
                              onClick={() => startCamera(facingMode)}
                              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                            >
                              Retry Camera Permission
                            </button>
                            <button
                              onClick={() => setActiveTab('upload')}
                              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                            >
                              Switch to Photo Upload
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-xs text-slate-300">
                            Starting live camera stream...
                          </p>
                          <button
                            onClick={() => startCamera(facingMode)}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
                          >
                            Grant Camera Access
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Big Shutter Button */}
                {cameraActive && (
                  <div className="flex items-center justify-center pt-2">
                    <button
                      onClick={capturePhoto}
                      disabled={isCapturing}
                      className="w-18 h-18 rounded-full border-4 border-teal-600 bg-white hover:bg-teal-50 p-1 flex items-center justify-center shadow-lg shadow-teal-600/30 active:scale-90 transition-all cursor-pointer"
                      title="Capture Photo"
                    >
                      <div className="w-13 h-13 rounded-full bg-teal-600 flex items-center justify-center text-white">
                        <Camera className="w-6 h-6" />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: UPLOAD IMAGE */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50 hover:bg-teal-50/40 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      Upload Medicine Packaging Photo
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Tap to select an image from your device photo library or file storage
                    </p>
                  </div>
                  <div className="inline-block px-4 py-2 bg-white border border-slate-200 text-teal-700 font-semibold text-xs rounded-xl shadow-xs">
                    Browse Photos
                  </div>
                </div>

                <div className="text-xs text-slate-500 space-y-1">
                  <p className="font-medium text-slate-700">Supported formats:</p>
                  <p>JPG, PNG, WebP up to 25MB. High resolution recommended for batch text readability.</p>
                </div>
              </div>
            )}

            {/* TAB 3: TEST PRESET SAMPLES */}
            {activeTab === 'samples' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  Select a pre-captured sample package to test MediShield AI's preliminary screening:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div
                    onClick={() => handleSelectSample('amoxicillin')}
                    className="p-3 border border-slate-200 hover:border-emerald-500 rounded-xl bg-slate-50 hover:bg-emerald-50/30 cursor-pointer transition-all space-y-2"
                  >
                    <div className="aspect-4/3 rounded-lg overflow-hidden bg-slate-200">
                      <img
                        src="/src/assets/images/sample_amoxicillin_1790843268269.jpg"
                        alt="Amoxicillin sample"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Blister Strip
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-1">
                        Amoxicillin 500mg
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Batch AMX9821, Exp 11/2027
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleSelectSample('ibuprofen')}
                    className="p-3 border border-slate-200 hover:border-emerald-500 rounded-xl bg-slate-50 hover:bg-emerald-50/30 cursor-pointer transition-all space-y-2"
                  >
                    <div className="aspect-4/3 rounded-lg overflow-hidden bg-slate-200">
                      <img
                        src="/src/assets/images/sample_ibuprofen_1790843282178.jpg"
                        alt="Ibuprofen sample"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Carton Box
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-1">
                        Ibuprofen 400mg
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Batch IBU4402, Exp 09/2028
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleSelectSample('verify')}
                    className="p-3 border border-slate-200 hover:border-amber-500 rounded-xl bg-slate-50 hover:bg-amber-50/30 cursor-pointer transition-all space-y-2"
                  >
                    <div className="aspect-4/3 rounded-lg overflow-hidden bg-slate-200">
                      <img
                        src="/src/assets/images/sample_pack_authentic_1790841933319.jpg"
                        alt="Paracetamol verify sample"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        Missing Info Example
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-1">
                        Paracetamol 500mg
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Missing manufacturer details
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleSelectSample('suspicious')}
                    className="p-3 border border-slate-200 hover:border-rose-500 rounded-xl bg-slate-50 hover:bg-rose-50/30 cursor-pointer transition-all space-y-2"
                  >
                    <div className="aspect-4/3 rounded-lg overflow-hidden bg-slate-200">
                      <img
                        src="/src/assets/images/sample_pack_suspicious_1790841945116.jpg"
                        alt="Suspicious sample"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                        High Concern Example
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-1">
                        Damaged / Smudged Box
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Worn corners, unclear font
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden canvas for capturing video frame */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
