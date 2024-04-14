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
        fbrown: {
          DEFAULT: "#473520",
        },
      },
      backgroundImage: {
        'casks': "url('/casks.jpeg')"
      }
    },
  },
  plugins: [],
};
export default config;
