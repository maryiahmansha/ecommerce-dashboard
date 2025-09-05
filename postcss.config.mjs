// postcss.config.mjs
const config = {
    plugins: {
        '@tailwindcss/postcss': {},
        // autoprefixer is optional for v4 (Tailwind handles vendor prefixes automatically),
        // but you can enable it if you want:
        // autoprefixer: {},
    },
};

export default config;
