// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",  // Make sure this includes .jsx files
  ],
  theme: {
    extend: {
      fontFamily: {
        // Custom fonts
        inter: ['Inter', 'sans-serif'],
        shrikhand: ['Shrikhand', 'cursive'],
        sometype: ['Sometype-mono', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],  // Corrected font name
      },
    },
  },
  plugins: [],
};


