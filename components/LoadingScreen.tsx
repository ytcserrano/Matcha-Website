import React from "react";
import { CopyBlock } from "@/config";

interface LoadingScreenProps {
    progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
            <div className="w-64 space-y-4">
                <div className="text-center font-sans text-xs tracking-[0.2em] text-white/40 uppercase">
                    Loading Experiment
                </div>

                {/* Progress Bar Container */}
                <div className="h-[2px] w-full overflow-hidden bg-white/10 rounded-full">
                    <div
                        className="h-full bg-white transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="text-center font-mono text-xs text-white/30">
                    {Math.round(progress)}%
                </div>
            </div>
        </div>
    );
};
