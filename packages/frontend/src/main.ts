import {
    BrightnessController,
    Button,
    ClockController,
    CommunicationController,
    Data,
    MenuController,
    ObservableValue,
    PhotoController,
    Root,
    SpotifyController,
    State
} from "./index";

(async function () {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";


    const communicationController = new CommunicationController();
    const data: Data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")!) : {};
    const state: State = {
        photoUrl: new ObservableValue(data.photosUrl),
        menus: new ObservableValue<Button[][]>([]),
        page: new ObservableValue(data.page ?? "clock"),
        focusedElement: new ObservableValue<HTMLInputElement | undefined>(undefined)
    };

    state.page.addListener((value) => {
        data.page = value;
        localStorage.setItem("data", JSON.stringify(data));
    })

    state.photoUrl.addListener(value => {
        data.photosUrl = value;
        localStorage.setItem("data", JSON.stringify(data));
    })

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
                        name: "F",
                        onClick: (menu) => {
                            document.body.requestFullscreen();
                            menuController.removeMenu(menu)
                        }
                    }, {
                        name: "⚙️",
                        onClick: (menu) => {
                            state.page.value = "gear"
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
        brightnessController: new BrightnessController(),
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