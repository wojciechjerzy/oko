import {
    BrightnessController,
    Button,
    ClockController,
    CommunicationController,
    Data,
    MenuController,
    ObservableValue,
    Page,
    PhotoController,
    Root,
    SpotifyController,
    State
} from "./index";
import iconCat from './assets/icon_cat.png?url';
import {html} from "lit";

(async function () {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";


    const communicationController = new CommunicationController();
    const data: Data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")!) : {};
    const state: State = {
        photoUrl: new ObservableValue(data.photosUrl),
        menus: new ObservableValue<Button[][]>([]),
        page: new ObservableValue<Page>(data.page ?? "clock"),
        focusedElement: new ObservableValue<HTMLInputElement | undefined>(undefined),
        wifi: new ObservableValue<any>(undefined),
        brightness: new ObservableValue<number>(data.brightness ?? 100)
    };

    state.page.addListener((value) => {
        data.page = value;
        localStorage.setItem("data", JSON.stringify(data));
    })

    state.photoUrl.addListener(value => {
        data.photosUrl = value;
        localStorage.setItem("data", JSON.stringify(data));
    })

    state.wifi.value = await communicationController.fetchInfo();

    const menuController = new MenuController({state});
    menuController.addButtons([
        {
            name: "⋮",
            onClick: () => {
                menuController.addButtons([
                    {
                        name: "⋮",
                        onClick: (menu) => {
                            menuController.removeMenu(menu)
                        }
                    }, {
                        name: "🕒",
                        onClick: (menu) => {
                            state.page.value = "clock"
                            menuController.removeMenu(menu)
                        }
                    }, {
                        name: "🎵",
                        onClick: (menu) => {
                            state.page.value = "spotify"
                            menuController.removeMenu(menu)
                        }
                    }, {
                        name: "📷",
                        onClick: (menu) => {
                            state.page.value = "photos"
                            menuController.removeMenu(menu)
                        }
                    }, {
                        name: "🌝",
                        onClick: (menu) => {
                            state.page.value = "moon"
                            menuController.removeMenu(menu)
                        }
                    }, {
                        name: html`<img src=${iconCat} width="80" height="80"/>`,
                        onClick: (menu) => {
                            state.page.value = "cat"
                            menuController.removeMenu(menu)
                        }
                    }, {
                        name: "F",
                        onClick: (menu) => {
                            document.body.requestFullscreen();
                            menuController.removeMenu(menu)
                        }
                    }, {
                        name: "⚙️",
                        onClick: (menu) => {
                            state.page.value = "settings"
                            menuController.removeMenu(menu)
                        }
                    },
                    {
                        name: "↻",
                        onClick: (menu) => {
                            location.reload()
                            menuController.removeMenu(menu)
                        }
                    },
                    {
                        name: "↑",
                        onClick: (menu) => {
                            fetch("http://localhost:2137/upgrade")
                            menuController.removeMenu(menu)
                        }
                    },
                    {
                        name: "🔆️",
                        onClick: (menu) => {
                            state.page.value = "brightness"
                            menuController.removeMenu(menu)
                        }
                    },
                    {
                        name: "+",
                        onClick: (menu) => state.brightness.value = Math.min(100, state.brightness.value + 10)
                    },
                    {
                        name: "-",
                        onClick: (menu) => state.brightness.value = Math.max(0, state.brightness.value - 10)
                    },
                    {
                        name: "⏻",
                        onClick: (menu) => {
                            fetch("http://localhost:2137/shutdown")
                            menuController.removeMenu(menu)
                        }
                    }
                ]);
            }
        }
    ])

    const root: Root = document.createElement("root-component");
    root.controllers = {
        data,
        state,
        menuController,
        spotifyController: new SpotifyController(),
        clockController: new ClockController(),
        brightnessController: new BrightnessController({communicationController, state, data}),
        communicationController,
        photoController: new PhotoController({communicationController, state})
    };
    document.body.appendChild(root);


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