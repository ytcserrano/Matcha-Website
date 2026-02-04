import React, { RefObject } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { SCROLL_CONFIG, COPY_DATA, CopyBlock } from "@/config";
import { clsx } from "clsx";

interface TextOverlaysProps {
    containerRef: RefObject<HTMLElement>;
}

const TextBlock = ({ block, scrollYProgress }: { block: CopyBlock; scrollYProgress: MotionValue<number> }) => {
    const { start, end, title, subtitle, align, visualNote } = block;

    // 10% fade duration relative to the block's total duration? 
    // Or 10% of the entire scroll?
    // "Fade in during first 10% of each beat range"
    // Range is e.g. 0.00 to 0.20 (total 0.20). 10% of that is 0.02.
    const duration = end - start;
    const fadeDuration = duration * 0.1;

    const opacity = useTransform(
        scrollYProgress,
        [start, start + fadeDuration, end - fadeDuration, end],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [start, start + fadeDuration, end - fadeDuration, end],
        [20, 0, 0, -20]
    );

    // Alignment classes
    const alignClass =
        align === "center" ? "items-center text-center justify-center" :
            align === "left" ? "items-start text-left justify-center pl-10 md:pl-20" :
                align === "right" ? "items-end text-right justify-center pr-10 md:pr-20" : "";

    return (
        <motion.div
            style={{ opacity, y, display: useTransform(opacity, (v) => v > 0 ? "flex" : "none") }}
            className={clsx(
                "fixed inset-0 z-10 flex flex-col pointer-events-none p-6 md:p-12",
                alignClass
            )}
        >
            <div className="max-w-4xl space-y-2 md:space-y-6">
                <h2 className="text-7xl md:text-9xl font-bold tracking-tighter text-white/90 font-sans leading-[0.85]">
                    {title}
                </h2>
                <p className="text-lg md:text-2xl font-light tracking-wide text-white/60">
                    {subtitle}
                </p>

                {visualNote && (
                    <div className="mt-8 overflow-hidden rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                        <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                            Note: {visualNote}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export const TextOverlays: React.FC<TextOverlaysProps> = ({ containerRef }) => {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <>
            {COPY_DATA.map((block) => (
                <TextBlock key={block.id} block={block} scrollYProgress={scrollYProgress} />
            ))}

            {/* Scroll Indicator */}
            <ScrollIndicator scrollYProgress={scrollYProgress} />
        </>
    );
};

const ScrollIndicator = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <motion.div
            style={{ opacity }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll to Explore</span>
            <div className="h-10 w-[1px] bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
    );
}
