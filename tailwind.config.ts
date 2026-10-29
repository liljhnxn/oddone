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
        charcoal: {
          950: "#0b0b0e",
          900: "#121216",
          850: "#16161c",
          800: "#1c1c24",
          700: "#272732",
          600: "#363645",
        },
        brand: {
          purple: "#8b5cf6",
          purpleDark: "#6d28d9",
          purpleLight: "#a78bfa",
          green: "#10b981",
          greenDark: "#059669",
          red: "#f43f5e",
        },
      },
    },
  },
  plugins: [],
};

export default config;

