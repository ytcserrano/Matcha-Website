"use client";

import { useRef } from "react";
import { useCanvasImages } from "@/hooks/useCanvasImages";
import { ScrollSequence } from "@/components/ScrollSequence";
import { TextOverlays } from "@/components/TextOverlays";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { SCROLL_CONFIG } from "@/config";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { images, progress, isLoading } = useCanvasImages();

    if (isLoading) {
        return <LoadingScreen progress={progress} />;
    }

    return (
        <main className="relative bg-[#050505]">
            {/* Scroll Wrapper */}
            <div
                ref={containerRef}
                style={{ height: `${SCROLL_CONFIG.WRAPPER_HEIGHT_VH}vh` }}
                className="relative w-full"
            >
                <ScrollSequence images={images} containerRef={containerRef} />
                <TextOverlays containerRef={containerRef} />
            </div>

            <Testimonials />
            <CallToAction />
        </main>
    );
}
