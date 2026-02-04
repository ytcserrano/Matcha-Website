import React from "react";
import { TESTIMONIALS_DATA } from "@/config";

export const Testimonials = () => {
    return (
        <section className="relative z-10 w-full bg-[#050505] py-32 px-6 md:px-12">
            <div className="mx-auto max-w-6xl">
                <div className="mb-20 text-center">
                    <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">
                        Reflections
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                    {TESTIMONIALS_DATA.map((item, index) => (
                        <div key={index} className="flex flex-col space-y-8">
                            <p className="font-serif text-2xl md:text-3xl leading-relaxed text-white/80 italic">
                                "{item.quote}"
                            </p>
                            <div className="space-y-1">
                                <p className="font-sans text-sm font-bold tracking-wide text-white">
                                    {item.author}
                                </p>
                                <p className="font-mono text-xs uppercase tracking-wider text-white/40">
                                    {item.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
