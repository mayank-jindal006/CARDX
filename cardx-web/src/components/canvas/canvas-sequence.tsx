"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { VIDEOS, TOTAL_FRAMES } from "@/lib/constants";
import { ExplosionOverlay } from "./explosion-overlay";
import { GateOverlay } from "./gate-overlay";

// Map sequential frame index to exact folder path and local frame number
function getFramePath(index: number) {
    let framePath = "";

    if (index <= VIDEOS.EXPLOSION.frameCount) {
        const frameNum = Math.max(1, index).toString().padStart(3, "0");
        framePath = `/assets/videoframes/${VIDEOS.EXPLOSION.folder}/ezgif-frame-${frameNum}.jpg`;
    } else if (index <= VIDEOS.EXPLOSION.frameCount + VIDEOS.REASSEMBLE.frameCount) {
        const localIndex = index - VIDEOS.EXPLOSION.frameCount;
        const frameNum = Math.max(1, localIndex).toString().padStart(3, "0");
        framePath = `/assets/videoframes/${VIDEOS.REASSEMBLE.folder}/ezgif-frame-${frameNum}.jpg`;
    } else {
        const localIndex = index - VIDEOS.EXPLOSION.frameCount - VIDEOS.REASSEMBLE.frameCount;
        const frameNum = Math.max(1, localIndex).toString().padStart(3, "0");
        framePath = `/assets/videoframes/${VIDEOS.GATE.folder}/ezgif-frame-${frameNum}.jpg`;
    }

    return framePath;
}

export function CanvasSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedFrames, setLoadedFrames] = useState(0);

    // Total scroll length for the sequence
    const SCROLL_HEIGHT = "500vh";

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress (0 to 1) to frame index (1 to TOTAL_FRAMES)
    const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        // To prevent blocking, we could load sequentially or lazy load, but for a smooth scrub, preloading is best
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loadedCount++;
                setLoadedFrames(loadedCount);
                // Draw the first frame immediately once loaded
                if (i === 1 && canvasRef.current) {
                    const ctx = canvasRef.current.getContext("2d");
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                    }
                }
            };
            loadedImages[i] = img;
        }

        setImages(loadedImages);
    }, []);

    // Use requestAnimationFrame for smooth drawing
    useMotionValueEvent(currentFrameIndex, "change", (latest) => {
        const frame = Math.floor(latest);
        if (!canvasRef.current || !images[frame]) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        requestAnimationFrame(() => {
            // Clear canvas (optional but good practice)
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            // Draw new frame (assuming 16:9 1920x1080 bounds, can adjust aspect ratio logic here)
            ctx.drawImage(images[frame], 0, 0, canvasRef.current!.width, canvasRef.current!.height);
        });
    });

    // Calculate canvas size on mount/resize (simplified)
    useEffect(() => {
        if (!canvasRef.current) return;
        const updateSize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = window.innerWidth;
            // Depending on how you want to handle aspect ratio.
            // Usually scrollytelling relies on object-fit-like canvas drawing.
            // For now, let's strictly cover the viewport.
            canvas.height = window.innerHeight;
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative w-full z-20 cursor-none">
            {/* Sticky container holds the canvas perfectly in view */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#050505] pointer-events-none">

                {/* If images aren't fully loaded, we can show a subtle indicator, or just let it pop in */}
                {loadedFrames < TOTAL_FRAMES * 0.1 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50 text-white/50 text-sm">
                        Buffering... {Math.round((loadedFrames / TOTAL_FRAMES) * 100)}%
                    </div>
                )}

                {/* Adjust styling depending on how we want the image to scale (contain or cover) */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain md:object-cover mix-blend-screen"
                />

                {/* We will later add Overlays here inside the sticky container, driven by framer motion */}
                <ExplosionOverlay />
                <GateOverlay scrollYProgress={scrollYProgress} />

            </div>
        </div>
    );
}
