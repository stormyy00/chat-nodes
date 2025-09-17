import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gpt: {
          bg: "#FAF7F2",
          panel: "#E6E0D4",
          accent: "#C9B6D9",
          text: "#3E3A40",
          textSecondary: "#4B4643",
          userBubble: "#F5E3DC",
          userBorder: "#E6D5CF",
          botBubble: "#FFFEFB",
          sage: "#A9C3B6",
          lavender: "#D4C5E8",
          peach: "#F7D7C4",
          mint: "#B8E6B8",
          coral: "#FFB3A7",
          sky: "#B3D9FF",
          cream: "#F5F0E8",
          warm: "#E8D5B7",
          soft: "#F0E6D2",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        sidebar: {
          DEFAULT: "#E6E0D4",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [],
};
export default config;
