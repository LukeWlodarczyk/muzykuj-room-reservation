import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-brand-purple": "#cad8fa",
        "light-brand-blue": "#b3f2fc",
        "brand-blue": "#bce5fb",
        "dark-brand-blue": "#81d1f8",
        "brand-black": "#27272a",
      },
      size: {
        "login-logo": "17.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
