import { browser } from "$app/environment";

// place files you want to import through the `$lib` alias in this folder.

export type PreloadImageResult = {
    img: HTMLImageElement;
    src: string;
    loaded: boolean;
};

export type PreloadOptions = {
    signal?: AbortSignal;
    onLoad?: (img: HTMLImageElement) => void;
};

/**
 * Preload an image with abort support and load callback
 * @param src - Image source URL
 * @param options - Optional abort signal and load callback
 * @returns Promise that resolves with image element or null on server
 */
export const preload = async (
    src: string,
    options?: PreloadOptions
): Promise<HTMLImageElement | null> => {
    return new Promise((resolve, reject) => {
        if (!browser) {
            // On server-side, resolve with null to avoid pending state
            resolve(null);
            return;
        }

        const img = new Image();
        
        // Handle abort
        const abortHandler = () => {
            img.src = ''; // Stop loading
            reject(new DOMException('Image preload aborted', 'AbortError'));
        };
        
        if (options?.signal) {
            if (options.signal.aborted) {
                abortHandler();
                return;
            }
            options.signal.addEventListener('abort', abortHandler, { once: true });
        }

        img.onload = () => {
            // Remove abort listener if exists
            if (options?.signal) {
                options.signal.removeEventListener('abort', abortHandler);
            }
            
            // Call load callback if provided
            options?.onLoad?.(img);
            
            resolve(img);
        };
        
        img.onerror = () => {
            // Remove abort listener if exists
            if (options?.signal) {
                options.signal.removeEventListener('abort', abortHandler);
            }
            reject(new Error(`Failed to load image: ${src}`));
        };
        
        img.src = src;
    });
};