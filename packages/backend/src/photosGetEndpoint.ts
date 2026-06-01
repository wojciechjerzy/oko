import {Request, Response} from 'express';
import {fetchImageUrls} from "./fetchImageUrls.js";


export function photosGetEndpoint() {
    return async (req: Request, res: Response) => {
        const url = req.query.url as string;
        if (!url) {
            res.status(400).json({error: 'Album URL not configured'});
            return;
        } else {
            const images = await fetchImageUrls(url);
            if (!images.length) {
                res.status(404).json({error: 'No images found'});
            }
            const image = images[Math.floor(Math.random() * images.length)];
            const randomPhotoResponse = await fetch(image, {
                headers: {'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)'},
            });
            const contentType = randomPhotoResponse.headers.get('content-type') || 'image/jpeg';
            const base64 = Buffer.from(await randomPhotoResponse.arrayBuffer()).toString('base64');
            res.json({contentType, base64});
        }
    };
}
