/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: "#f8efe4",
        sjs: {
          bg: "#08060c",
          "bg-soft": "#0d0912",
          surface: "#1b1424",
          "surface-2": "#2a1f35",
          border: "#4d405c",
          cream: "#fff2dc",
          text: "#fbf8ff",
          muted: "#ded3e6",
          purple: "#c7b7e0",
          "purple-soft": "#251735",
          "purple-dark": "#a985ce",
          orange: "#f2a044",
          green: "#b9d6a0"
        },
        violet: {
          deep: "#6d3fa3",
          dusk: "#a970dd",
          mist: "#21182b"
        },
        sanctuary: {
          paper: "#08060c",
          linen: "#17111f",
          amber: "#f2a044",
          sage: "#b9d6a0",
          moss: "#b9d6a0",
          rose: "#b76455",
          charcoal: "#0b0810"
        }
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Source Sans 3", "Aptos", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgb(0 0 0 / 0.25)"
      }
    }
  },
  plugins: []
};
