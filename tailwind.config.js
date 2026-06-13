export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'Space Mono'", "monospace"]
      },
      colors: {
        stelvio: {
          dark: "#111111",
          card: "#1a1a1a",
          border: "#2a2a2a",
          white: "#ffffff",
          gray: "#a3a3a3",
          accent: "#3b82f6"
        }
      }
    },
  },
  plugins: [],
}
