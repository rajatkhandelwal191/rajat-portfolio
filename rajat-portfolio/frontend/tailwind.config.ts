import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08111f",
        foreground: "#e6edf7",
        glass: "rgba(255, 255, 255, 0.08)",
      },
      boxShadow: {
        glass: "0 8px 30px rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        clay: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
