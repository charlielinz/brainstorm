/** @type {import('tailwindcss').Config} */
import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["Inter var", ..._fontFamily.sans],
    },
  },
};
export const plugins = [];
