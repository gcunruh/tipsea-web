module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ibm-plex-mono': ['"IBM Plex Mono"'],
        'press-start': ['"Press Start 2P"'],
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
