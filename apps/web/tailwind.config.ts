import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./apps/web/src/**/*.{ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
