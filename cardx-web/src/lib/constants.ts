// List of constants reflecting the image sequence structure and sections

export const VIDEOS = {
    EXPLOSION: {
        folder: "video1,card explode",
        frameCount: 299,
    },
    REASSEMBLE: {
        folder: "video2, card assembleback",
        frameCount: 212,
    },
    GATE: {
        folder: "video3 animatedboypassingthroughattendencegate",
        frameCount: 212,
    }
};

export const TOTAL_FRAMES =
    VIDEOS.EXPLOSION.frameCount +
    VIDEOS.REASSEMBLE.frameCount +
    VIDEOS.GATE.frameCount;
