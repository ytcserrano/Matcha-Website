import React, { useRef, useEffect } from "react";
import { useScroll, useSpring, useReducedMotion } from "framer-motion";
import { SCROLL_CONFIG } from "@/config";

interface ScrollSequenceProps {
    images: HTMLImageElement[];
    containerRef: React.RefObject<HTMLElement>;
}

export const ScrollSequence: React.FC<ScrollSequenceProps> = ({ images, containerRef }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // We need to map the global scroll to the "duration" of the sequence.
    // The parent component wraps this in a tall div. 
    // But wait, the prompt says "Canvas behavior: sticky, top 0, full screen".
    // So this component will likely BE the sticky container, or reside inside it.
    // We'll trust the parent to provide the scroll context or we use window scroll.
    // The best way for scrollytelling is to have a ref on the wrapper.

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let requestAnimationFrameId: number;

        const render = () => {
            // If reduced motion, we force frame 0 and stop animation loop
            if (prefersReducedMotion) {
                const img = images[0];
                if (img) {
                    const dpr = window.devicePixelRatio || 1;
                    canvas.width = window.innerWidth * dpr;
                    canvas.height = window.innerHeight * dpr;
                    ctx.scale(dpr, dpr);

                    const canvasWidth = window.innerWidth;
                    const canvasHeight = window.innerHeight;
                    const imgAspect = img.width / img.height;
                    const canvasAspect = canvasWidth / canvasHeight;

                    let drawWidth, drawHeight, offsetX, offsetY;
                    if (canvasAspect > imgAspect) {
                        drawWidth = canvasWidth;
                        drawHeight = canvasWidth / imgAspect;
                        offsetX = 0;
                        offsetY = (canvasHeight - drawHeight) / 2;
                    } else {
                        drawWidth = canvasHeight * imgAspect;
                        drawHeight = canvasHeight;
                        offsetX = (canvasWidth - drawWidth) / 2;
                        offsetY = 0;
                    }
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }
                return; // Stop loop
            }

            const progress = smoothProgress.get();
            // Map progress 0-1 to frame index
            let frameIndex = Math.floor(progress * (SCROLL_CONFIG.FRAME_COUNT - 1));

            // Clamp
            frameIndex = Math.max(0, Math.min(frameIndex, SCROLL_CONFIG.FRAME_COUNT - 1));

            const img = images[frameIndex];

            if (img) {
                // Calculate scaling to cover
                // Use devicePixelRatio for sharpness
                const dpr = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                ctx.scale(dpr, dpr);

                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight;

                // Image aspect ratio
                const imgAspect = img.width / img.height;
                const canvasAspect = canvasWidth / canvasHeight;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasAspect > imgAspect) {
                    // Canvas is wider than image (crop top/bottom)
                    drawWidth = canvasWidth;
                    drawHeight = canvasWidth / imgAspect;
                    offsetX = 0;
                    offsetY = (canvasHeight - drawHeight) / 2;
                } else {
                    // Canvas is taller than image (crop sides)
                    drawWidth = canvasHeight * imgAspect;
                    drawHeight = canvasHeight;
                    offsetX = (canvasWidth - drawWidth) / 2;
                    offsetY = 0;
                }

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }

            requestAnimationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            if (requestAnimationFrameId) {
                cancelAnimationFrame(requestAnimationFrameId);
            }
        };
    }, [images, smoothProgress, prefersReducedMotion]);

    return (
        <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
            <canvas ref={canvasRef} className="block h-full w-full object-cover" />
        </div>
    );
};
