import { defineConfig, splitVendorChunkPlugin } from "vite";

export default defineConfig ({
    base:'/',
    build:{
        chunkSizeWarningLimit: 8000,
        plugins: [splitVendorChunkPlugin()]
    }
})