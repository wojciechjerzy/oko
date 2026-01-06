import {css, html, LitElement, type TemplateResult} from 'lit'
import {provide} from "@lit-labs/context";
import {customElement, state} from 'lit/decorators.js'
import {type Controllers, controllersContext} from "../SpotifyContext.js";

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
    `;

    @provide({context: controllersContext})
    accessor controllers!: Controllers;

    @state()
    accessor page: string = "spotify"

    render() {
        return html`
            ${when(this.page === "spotify", () => html`
                <spotify-page></spotify-page>`)}
            <navigation-bar .buttons=${[
                {
                    name: "Spotify",
                    onClick: () => this.page = "spotify"
                },
                {
                    name: "Refresh",
                    onClick: () => location.reload()
                },
            ]}></navigation-bar>
        `;
    }
}
