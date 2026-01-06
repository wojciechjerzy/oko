import {SpotifyController} from "./modules/spotify/SpotifyController";
import "./components/index.js";
import "./modules/spotify/SpotifyPage";
import {Root} from "./components";

(async function () {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    const root: Root = document.createElement("root-component");
    document.body.appendChild(root);

    root.controllers = {
        spotifyController: new SpotifyController()
    };

    let prevWidth = NaN;
    let prevHeight = NaN;

    function updateSize() {
        if (prevWidth !== window.innerWidth || prevHeight !== window.innerHeight) {
            prevWidth = window.innerWidth
            prevHeight = window.innerHeight
            root.style.setProperty("--size", "" + Math.min(window.innerWidth, window.innerHeight));
        }
    }

    setInterval(() => updateSize(), 1000);
    updateSize();

})();