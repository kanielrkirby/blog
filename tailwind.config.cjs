let plugin = require("tailwindcss/plugin");

function withOpacity(variableName, opacity) {
  if (variableName && opacity) {
    return `rgba(var(${variableName}), ${opacity})`;
  }
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    nbShadow: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
    },
    // Remove the following screen breakpoint or add other breakpoints
    // if one breakpoint is not enough for you
    screens: {
      sm: "640px",
    },

    extend: {
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          "base-faded": withOpacity("--color-text-base", 0.8),
          accent: withOpacity("--color-accent"),
          inverted: withOpacity("--color-fill"),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          "fill-dark": withOpacity("--color-fill-dark"),
          accent: withOpacity("--color-accent"),
          inverted: withOpacity("--color-text-base"),
          card: withOpacity("--color-card"),
          "card-muted": withOpacity("--color-card-muted"),
        },
      },
      outlineColor: {
        skin: {
          fill: withOpacity("--color-accent"),
        },
      },
      borderColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          line: withOpacity("--color-border"),
          fill: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
        },
      },
      colors: {
        skin: {
          fill: withOpacity("--color-fill"),
          "fill-dark": withOpacity("--color-fill-dark"),
          inverted: withOpacity("--color-text-base"),
          card: withOpacity("--color-card"),
          "card-muted": withOpacity("--color-card-muted"),
          base: withOpacity("--color-text-base"),
          line: withOpacity("--color-border"),
          accent: withOpacity("--color-accent"),
        },
      },
      fill: {
        skin: {
          base: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
        },
        transparent: "transparent",
      },
      stroke: {
        skin: {
          base: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
        },
        transparent: "transparent",
      },
      fontFamily: {
        mono: ["Courier Prime", "IBM Plex Mono", "monospace"],
        code: ["Monaspace Neon", "IBM Plex Mono", "monospace"],
        base: ["Noto Sans Mono"],
      },

      typography: {
        DEFAULT: {
          css: {
            pre: {
              color: false,
            },
            code: {
              color: false,
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ matchComponents, theme }) => {
      const values = theme("nbShadow");
      matchComponents(
        {
          "nb-shadow": v => {
            return {
              [`@apply cursor-pointer transition-all duration-200 border-[${v / 2.5}px] dark:border-white border-black shadow-black dark:shadow-skin-card-muted shadow-[0_0_0_0_var(--tw-shadow-color)] hover:shadow-[${v}px_${v}px_0_0_var(--tw-shadow-color)] hover:translate-x-[-${v}px] hover:translate-y-[-${v}px] translate-x-0 translate-y-0`]:
                {},
            };
          },
        },
        {
          values,
        }
      );
    }),
  ],
};
