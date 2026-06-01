export async function fetchImageUrls(url: string) {
    const rez = await fetch(url, {
        headers: {'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)'},
    });
    const text = await rez.text();
    const regex = /https:\/\/[^\s"]*\.googleusercontent\.com\/pw\/[a-zA-Z0-9_-]+/g;
    const matches = text.match(regex) || [];
    const urls = matches.filter((value, index, array) => array.indexOf(value) === index);
    return urls;
}