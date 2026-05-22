import {css, html, LitElement, type TemplateResult} from 'lit'
import {provide} from "@lit-labs/context";
import {customElement, state} from 'lit/decorators.js'
import {type ApplicationContext, applicationContext} from "../ApplicationContext";
import {NavigationBar} from "./NavigationBar";

declare global {
    interface HTMLElementTagNameMap {
        "root-component": Root;
    }
}

function when(condition: boolean, callback: () => TemplateResult) {
    if (condition) return callback();
}

@customElement('root-component')
export class Root extends LitElement {
    static styles = css`
        :host {
            width: 1080px;
            height: 1080px;
            position: absolute;
            left: calc(50% - 540px);
            top: calc(50% - 540px);
            scale: calc(var(--size) / 1080);
        }

        .navigation {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
        }
    `;

    @provide({context: applicationContext})
    accessor controllers!: ApplicationContext;

    @state()
    accessor page: string = "spotify"

    render() {
        return html`
            ${when(this.page === "spotify", () => html`
                <spotify-page></spotify-page>`)}
            ${
                    NavigationBar.template({
                        clazz: "navigation",
                        buttons: [
                            {
                                name: "🕒",
                                onClick: () => this.page = "clock"
                            }, {
                                name: "🎵",
                                onClick: () => this.page = "spotify"
                            }, {
                                name: "📷",
                                onClick: () => this.page = "photos"
                            }, {
                                name: "⚙️",
                                onClick: () => this.page = "gear"
                            },
                            {
                                name: "↻",
                                onClick: () => location.reload()
                            },
                            {
                                name: "⏻",
                                onClick: () => fetch("http://localhost:2137/shutdown")
                            }
                        ],
                        numberOfButtons: 24,
                    })
            }
        `;
    }
}
