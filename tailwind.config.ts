import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-brand-purple": "#cad8fa",
        "brand-blue": "#bce5fb",
        "dark-brand-blue": "#2ca4c9",
        "brand-black": "#27272a",
      },
      size: {
        "login-logo": "17.5rem",
      },
      backgroundImage: {
        noise: "url('/src/features/common/assets/noise.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
