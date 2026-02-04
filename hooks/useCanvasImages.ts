import { useState, useEffect } from "react";
import { SCROLL_CONFIG } from "@/config";

export const useCanvasImages = () => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = new Array(SCROLL_CONFIG.FRAME_COUNT);
            let loadedCount = 0;
            const total = SCROLL_CONFIG.FRAME_COUNT;

            const promises = Array.from({ length: total }).map((_, i) => {
                return new Promise<void>((resolve, reject) => {
                    const index = i + SCROLL_CONFIG.START_INDEX;
                    const indexStr = String(index).padStart(SCROLL_CONFIG.PAD_LENGTH, "0");
                    const filename = `${SCROLL_CONFIG.FRAME_FILE_PREFIX}${indexStr}${SCROLL_CONFIG.FRAME_Ext}`;
                    const url = `${SCROLL_CONFIG.FRAME_PATH}${filename}`;

                    const img = new Image();
                    img.src = url;

                    // Assign immediately to preserve order
                    loadedImages[i] = img;

                    img.onload = () => {
                        loadedCount++;
                        setProgress((loadedCount / total) * 100);
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image: ${url}`);
                        loadedCount++;
                        setProgress((loadedCount / total) * 100);
                        resolve(); // Resolve anyway
                    };
                });
            });

            await Promise.all(promises);

            if (isMounted) {
                setImages(loadedImages);
                setIsLoading(false);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, []);

    return { images, progress, isLoading };
};
