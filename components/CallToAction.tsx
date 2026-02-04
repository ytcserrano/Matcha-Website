import React from "react";
import { CTA_COPY } from "@/config";

export const CallToAction = () => {
    return (
        <section className="relative z-10 w-full bg-[#050505] pb-32 pt-12 px-6 flex flex-col items-center justify-center text-center">
            <div className="max-w-3xl space-y-12">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-24" />

                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white font-sans">
                    {CTA_COPY.title}
                </h2>
                <p className="text-xl md:text-2xl font-light text-white/60 tracking-wide">
                    {CTA_COPY.subtitle}
                </p>

                <div className="pt-8">
                    <button className="group relative overflow-hidden rounded-full bg-white px-12 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-neutral-200 hover:scale-105 active:scale-95">
                        <span className="relative z-10">{CTA_COPY.buttonText}</span>
                    </button>
                </div>

                <p className="pt-24 font-mono text-xs uppercase tracking-[0.2em] text-white/20">
                    © 2024 StillRise • Maui
                </p>
            </div>
        </section>
    );
};
