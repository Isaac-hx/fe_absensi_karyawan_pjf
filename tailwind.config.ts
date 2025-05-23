import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Masukkan semua ekstensi file yang digunakan
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
