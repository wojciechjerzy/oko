import {defineConfig} from "vite";
import * as path from "node:path";
import * as fs from "node:fs";

export default defineConfig({
    base: './',
    server: {
        host: "0.0.0.0",
        port: 2137,
    },
    build: {
        outDir: './dist',
        emptyOutDir: true
    },
    plugins: [
        copyAfterBuild({
            src: 'backend.php',
            dest: 'dist/backend.php'
        })
    ]
});


function copyAfterBuild(options) {
    return {
        name: 'copy-after-build',
        closeBundle() {
            const src = path.resolve(options.src);
            const dest = path.resolve(options.dest);

            fs.cpSync(src, dest, {recursive: true, force: true});
            console.log(`Files copied from ${options.src} to ${options.dest}`);
        }
    };
}