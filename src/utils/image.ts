/**
 * Image helper utilities for MediShield AI
 */

export async function urlToDataUrl(url: string): Promise<string> {
  if (!url || url.startsWith('data:image/')) {
    return url;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) return url;
    const blob = await res.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('Could not convert url to dataUrl in browser', e);
    return url;
  }
}

/**
 * Resizes and compresses image data URL on the client to optimize vision upload latency and reliability.
 * Prevents massive 20MB phone camera uploads from timing out or hitting server payload limits.
 */
export async function optimizeImageForAnalysis(
  dataUrl: string,
  maxDimension = 1400,
  quality = 0.85
): Promise<string> {
  if (!dataUrl || !dataUrl.startsWith('data:image/')) {
    return dataUrl;
  }

  return new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // If image is already compact, return directly
      if (width <= maxDimension && height <= maxDimension && dataUrl.length < 1024 * 1024) {
        resolve(dataUrl);
        return;
      }

      // Calculate new scaled dimensions maintaining aspect ratio
      if (width > height) {
        if (width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const optimized = canvas.toDataURL('image/jpeg', quality);
      resolve(optimized);
    };

    img.onerror = () => {
      resolve(dataUrl);
    };

    img.src = dataUrl;
  });
}
