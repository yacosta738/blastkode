module.exports = {
  darkMode: "class",
  purge: {
    content: [
      "./src/**/*.vue",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.html",
      "./src/**/*.pug",
      "./src/**/*.md",
      "./docs/**/*.md",
      "./blog/**/*.md",
    ],
    options: {
      whitelist: [
        "body",
        "html",
        "img",
        "a",
        "g-image",
        "g-image--lazy",
        "g-image--loaded",
        "active",
      ],
    },
  },
  theme: {
    extend: {
      spacing: {
        80: "20rem",
        108: "27rem",
      },
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
      borderWidth: {
        14: "14px",
      },
      colors: {
        background: {
          primary: "var(--bg-background-primary)",
          secondary: "var(--bg-background-secondary)",
          tertiary: "var(--bg-background-tertiary)",

          form: "var(--bg-background-form)",
        },

        copy: {
          primary: "var(--text-copy-primary)",
          secondary: "var(--text-copy-hover)",
        },

        "border-color": {
          primary: "var(--border-border-color-primary)",
        },

        transparent: "transparent",

        black: "#000",
        white: "#fff",
        "dark-navy": "#020c1b",
        navy: "#0a192f",
        "light-navy": "#112240",
        "lightest-navy": "#233554",
        slate: "#8892b0",
        "light-slate": "#a8b2d1",
        "lightest-slate": "#ccd6f6",

        green: {
          100: "#d5f3ec",
          200: "#b4eee0",
          300: "#98efdb",
          400: "#87fde1",
          500: "#64ffda",
          600: "#4cbfa4",
          700: "#388c78",
          800: "#2b6658",
          900: "#133040",
        },

        gray: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
        },
      },
    },
    container: {
      padding: "1rem",
    },
    fontFamily: {
      sans: [
        '"Calibre"',
        '"San Francisco"',
        '"SF Pro Text"',
        "Nunito Sans",
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      mono: [
        '"SF Mono"',
        '"Fira Code"',
        '"Fira Mono"',
        '"Roboto Mono"',
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
  },
  variants: {
    transitionProperty: ["responsive", "motion-safe", "motion-reduce"],
    lineClamp: ["responsive", "hover"],
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
