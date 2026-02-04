export const SCROLL_CONFIG = {
    // Image Sequence
    FRAME_COUNT: 180,
    FRAME_PATH: "/sequence/",
    FRAME_FILE_PREFIX: "ezgif-frame-",
    FRAME_Ext: ".jpg",
    START_INDEX: 1, // 001
    PAD_LENGTH: 3,

    // Layout
    WRAPPER_HEIGHT_VH: 400, // 400vh scroll distance

    // Canvas
    BG_COLOR: "#050505",
};

export interface CopyBlock {
    id: string;
    start: number; // 0.0 to 1.0 (of scroll progress)
    end: number;
    title: string;
    subtitle: string;
    align: "left" | "center" | "right";
    visualNote?: string;
}

export const COPY_DATA: CopyBlock[] = [
    {
        id: "beat-a",
        start: 0.0,
        end: 0.2,
        title: "Breathe Deeper.",
        subtitle: "The air here is different. Heavier with life, lighter on the soul.",
        align: "center",
    },
    {
        id: "beat-b",
        start: 0.25,
        end: 0.45,
        title: "Ancient Waters.",
        subtitle: "Let the Pacific wash away the noise. Only the rhythm remains.",
        align: "left",
        visualNote: "Listen to the silence.",
    },
    {
        id: "beat-c",
        start: 0.5,
        end: 0.7,
        title: "Timeless.",
        subtitle: "Where the mountain meets the sky, time stops moving forward.",
        align: "right",
        visualNote: "Be present.",
    },
    {
        id: "beat-d",
        start: 0.75,
        end: 0.95,
        title: "Welcome Home.",
        subtitle: "You didn't just travel. You arrived.",
        align: "center",
        visualNote: "Aloha.",
    },
];

export const TESTIMONIALS_DATA = [
    {
        quote: "I forgot who I was for a moment, and remembered who I wanted to be.",
        author: "Elena R.",
        location: "New York"
    },
    {
        quote: "It wasn't a vacation. It was a return to something I didn't know I lost.",
        author: "James T.",
        location: "London"
    },
    {
        quote: "Maui doesn't just show you beauty. It insists you become part of it.",
        author: "Sarah K.",
        location: "Tokyo"
    }
];

export const CTA_COPY = {
    title: "The Island Is Waiting.",
    subtitle: "Reserve your sanctuary today.",
    buttonText: "Begin Your Journey"
};
