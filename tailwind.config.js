/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // [Default Size for Mobile, { LineHeight, LetterSpacing, etc. for Desktop }]
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],

        // Example: Base text is 14px on mobile, but 16px on desktop (lg)
        base: [
          "0.875rem",
          {
            lineHeight: "1.5rem",
            "@screen lg": { fontSize: "1rem" },
          },
        ],

        // Example: Headings that scale up significantly
        xl: [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            "@screen lg": { fontSize: "1.5rem" },
          },
        ],

        "3xl": [
          "1.875rem",
          {
            lineHeight: "2.25rem",
            letterSpacing: "-0.02em",
            "@screen lg": { fontSize: "2.5rem" },
          },
        ],
      },
    },
  },
  plugins: [],
};
