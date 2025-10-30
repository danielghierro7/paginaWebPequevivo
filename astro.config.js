import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    output: "server",  // importante para server-side rendering
    integrations: [react()],
    adapter: netlify(),
    vite: {
        plugins: [tailwindcss()],
    },
});
