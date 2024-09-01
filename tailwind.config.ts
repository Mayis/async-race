import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    theme: {
      extend: {
        boxShadow: {
          neon: "0 0 10px rgba(0, 255, 0, 0.7)" // Neon effect for the border
        },
        backgroundImage: {
          blur: "blur(10px)" // Background blur
        },
        colors: {
          "neon-green": "#39ff14" // Neon green color
        },
        textShadow: {
          custom: "2px 2px 4px rgba(0, 0, 0, 0.6)"
        }
      }
    }
  },
  plugins: []
};
export default config;
