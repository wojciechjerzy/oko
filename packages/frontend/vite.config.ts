import {defineConfig, PreviewServer, ViteDevServer} from "vite";
import * as path from "node:path";
import * as fs from "node:fs";

const ASSETS_SOURCE_DIR = path.resolve(__dirname, "../../assets");
const ASSETS_TARGET_DIR = 'dist/assets';

export default defineConfig({
    base: "./",
    server: {
        host: "0.0.0.0",
        port: 8080
    },
    build: {
        outDir: './dist',
        emptyOutDir: true
    },
    plugins: [
        serveExternalAssets(),
        copyAfterBuild({
            src: ASSETS_SOURCE_DIR,
            dest: ASSETS_TARGET_DIR
        })
    ]
});

function copyAfterBuild(options: { src: string, dest: string }) {
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

export function serveExternalAssets() {
    return {
        name: 'serve-external-assets',
        configureServer: (server: ViteDevServer) => {
            server.middlewares.use("/assets", externalAssetsMiddleware())
        },
        configurePreviewServer: (server: PreviewServer) => {
            server.middlewares.use("/assets", externalAssetsMiddleware())
        },
    };
}

function externalAssetsMiddleware() {
    return (req: any, res: any, next: any) => {
        // middleware jest podpięty pod "/assets", więc req.url to np. "/logo.png?x=1"
        const url = new URL(req.url, "http://localhost");
        const rel = decodeURIComponent(url.pathname).replace(/^\/+/, ""); // "logo.png"

        // normalizacja i ochrona przed .. / path traversal
        const safeRel = path.normalize(rel).replace(/^(\.\.(\/|\\|$))+/, "");
        const absPath = path.join(ASSETS_SOURCE_DIR, safeRel);

        // dodatkowa twarda blokada gdyby ktoś kombinował
        if (!absPath.startsWith(ASSETS_SOURCE_DIR + path.sep) && absPath !== ASSETS_SOURCE_DIR) {
            res.statusCode = 403;
            res.end("Forbidden");
            return;
        }

        fs.stat(absPath, (err, stat) => {
            if (err || !stat.isFile()) return next();

            res.statusCode = 200;
            res.setHeader("Content-Type", contentType(absPath));
            res.setHeader("Cache-Control", "no-cache");

            const stream = fs.createReadStream(absPath);
            stream.on("error", () => next());
            stream.pipe(res);
        });
    };
}

function contentType(filePath: string) {
    const ext = path.extname(filePath).toLowerCase();
    // minimalny mapping; możesz dopisać co potrzebujesz
    return (
        {
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".webp": "image/webp",
            ".gif": "image/gif",
            ".svg": "image/svg+xml",
            ".mp3": "audio/mpeg",
            ".wav": "audio/wav",
            ".mp4": "video/mp4",
            ".json": "application/json",
            ".txt": "text/plain; charset=utf-8",
            ".css": "text/css; charset=utf-8",
            ".js": "text/javascript; charset=utf-8",
            ".woff": "font/woff",
            ".woff2": "font/woff2",
        }[ext] || "application/octet-stream"
    );
}