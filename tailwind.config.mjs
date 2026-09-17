/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        sjs: {
          bg: "var(--sjs-bg)",
          "bg-soft": "var(--sjs-bg-soft)",
          surface: "var(--sjs-surface)",
          "surface-2": "var(--sjs-surface-2)",
          border: "var(--sjs-border)",
          cream: "var(--sjs-cream)",
          text: "var(--sjs-text)",
          muted: "var(--sjs-muted)",
          purple: "var(--sjs-purple)",
          "purple-soft": "var(--sjs-purple-soft)",
          "purple-dark": "var(--sjs-purple-dark)",
          orange: "var(--sjs-orange)",
          green: "var(--sjs-green)"
        },
        violet: {
          deep: "var(--sjs-purple-dark)",
          dusk: "var(--violet)",
          mist: "var(--violet-soft)"
        },
        sanctuary: {
          paper: "var(--paper)",
          linen: "var(--linen)",
          amber: "var(--amber)",
          sage: "var(--sage)",
          moss: "var(--moss)",
          rose: "var(--rose)",
          charcoal: "var(--sjs-bg-soft)"
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
