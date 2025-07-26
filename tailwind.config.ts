import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "muted-foreground": "var(--muted-foreground)",
        light: "var(--light)",
        card: "var(--card)",
        border: "var(--border)",
        primary: "#a4579f",
      },
      fontFamily: {
        geist: ["var(--font-geist-sans)"],
        geistMono: ["var(--font-geist-mono)"],
        cinzel: ["var(--font-cinzel)"],
      },
      screens: {
        xs: '400px', 
      },
    },
  },
  plugins: [heroui()],
};

export default config;
