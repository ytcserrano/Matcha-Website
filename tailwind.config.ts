import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050505", // User specified background
            },
            fontFamily: {
                sans: ["var(--font-inter)"], // User specified font
            },
        },
    },
    plugins: [],
};
export default config;
