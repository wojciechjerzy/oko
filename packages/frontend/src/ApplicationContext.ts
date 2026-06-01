import {createContext} from "@lit-labs/context";
import {SpotifyController} from "./modules/spotify/SpotifyController";
import {ClockController} from "./modules/clock/ClockController";
import {BrightnessController} from "./modules/brightness/BrightnessController";
import {PhotoController} from "./modules/photo/PhotoController";
import {Button, NavigationBar} from "./components/NavigationBar";
import {State} from "./State";
import {Data} from "./Data";
import {CommunicationController} from "./CommunicationController";

type AflabetType = "abc" | "ABC" | "123" | "!@#";

export class MenuController {
    private state: State;

    constructor({state}: { state: State }) {
        this.state = state;
    }

    focus(target: HTMLInputElement) {
        this.state.focusedElement.value = target;
        this.addButtons(this.createAlfabet(target, "abc"));
    }

    createAlfabet(target: HTMLInputElement, type: AflabetType): Button[] {
        const buttons: Button[] = [];

        const alfabets: Record<AflabetType, string[]> = {
            "!@#": "!@#$%^&*()_+-=[]{}/\\,.<>".split(""),
            "123": "0123456789".split(""),
            ABC: "ABCDEFGHIJKLMNOPRSTUVWXYZ".split(""),
            abc: "abcdefghijklmnoprstuvwxyz".split("")

        }
        target.addEventListener("blur", () => this.removeMenu(buttons));

        buttons.push({
            name: "↵",
            onClick: (menu) => {
                target.blur();
                this.removeMenu(menu)
            }
        })

        buttons.push({
            name: "⌫",
            onClick: (menu) => {
                target.value = target.value.slice(0, -1);
                target.focus();
            }
        })

        if (type !== "abc") {
            buttons.push({
                name: "abc",
                onClick: (menu) => {
                    this.removeMenu(menu);
                    this.addButtons(this.createAlfabet(target, "abc"));
                }
            })
        }

        if (type !== "ABC") {
            buttons.push({
                name: "ABC",
                onClick: (menu) => {
                    this.removeMenu(menu);
                    this.addButtons(this.createAlfabet(target, "ABC"));
                }
            })
        }

        if (type !== "123") {
            buttons.push({
                name: "123",
                onClick: (menu) => {
                    this.removeMenu(menu);
                    this.addButtons(this.createAlfabet(target, "123"));
                }
            })
        }

        if (type !== "!@#") {
            buttons.push({
                name: "!@#",
                onClick: (menu) => {
                    this.removeMenu(menu);
                    this.addButtons(this.createAlfabet(target, "!@#"));
                }
            })
        }


        alfabets[type].forEach(letter => {
            buttons.push({
                name: letter,
                onClick: (menu) => {
                    target.value += letter;
                    target.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
                }
            })
        })

        return buttons;
    }

    blur(target: HTMLInputElement) {
        if (this.state.focusedElement.value === target) {
            this.state.focusedElement.value = undefined;
        }
    }

    render() {
        const lastMenu = this.state.menus.value[this.state.menus.value.length - 1];
        return NavigationBar.template({
            clazz: "navigation",
            buttons: lastMenu ?? [],
            numberOfButtons: Math.max(lastMenu.length, 24),
        })
    }

    addButtons(menu: Button[]) {
        this.state.menus.value = [...this.state.menus.value, menu];
    }

    removeMenu(menu: Button[]) {
        const index = this.state.menus.value.indexOf(menu);
        if (index >= 0) {
            this.state.menus.value.splice(index, 1)
        }
        this.state.menus.value = [...this.state.menus.value];

    }
}

export type ApplicationContext = {
    menuController: MenuController;
    data: Data
    state: State
    spotifyController: SpotifyController
    clockController: ClockController
    brightnessController: BrightnessController,
    photoController: PhotoController,
    communicationController: CommunicationController
};
export const applicationContext = createContext<ApplicationContext | undefined>(Symbol('context'));
