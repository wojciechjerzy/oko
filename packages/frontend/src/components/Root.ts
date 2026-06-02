import {css, html, LitElement, type TemplateResult} from 'lit'
import {provide} from "@lit-labs/context";
import {customElement} from 'lit/decorators.js'
import {type ApplicationContext, applicationContext} from "../ApplicationContext";
import {ClockPage} from "../modules/clock/ClockPage";
import {MoonPage} from "../modules/moon/MoonPage";
import {PhotoPage} from "../modules/photo/PhotoPage";
import {SettingsPage} from "../modules/settings/SettingsPage";
import {SpotifyPage} from "../modules/spotify/SpotifyPage";
import {CatsPage} from "../modules/moon/CatsPage";
import {Page} from "../Page";

declare global {
    interface HTMLElementTagNameMap {
        "root-component": Root;
    }
}

function when(condition: boolean, callback: () => TemplateResult) {
    if (condition) return callback();
}

function inlineSwitch<T extends string>(options: Record<T, () => TemplateResult>, value: T) {
    return options[value]?.();
}

@customElement('root-component')
export class Root extends LitElement {

    static template({clazz}: { clazz: string }) {
        return html`
            <root-component class=${clazz}>

            </root-component>`;
    }

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

        .page {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    `;

    @provide({context: applicationContext})
    accessor controllers!: ApplicationContext;

    connectedCallback() {
        super.connectedCallback();
        this.controllers.state.page.addListener(this.refresh, this);
        this.controllers.state.menus.addListener(this.refresh, this);
    }

    disconnectedCallback() {
        this.controllers.state.menus.removeListener(this.refresh, this);
        this.controllers.state.page.removeListener(this.refresh, this);
        super.disconnectedCallback();
    }

    refresh() {
        this.requestUpdate();
    }

    render() {
        return html`
            ${
                    inlineSwitch<Page>({
                        spotify: () => SpotifyPage.template({clazz: "page"}),
                        clock: () => ClockPage.template({clazz: "page"}),
                        photos: () => PhotoPage.template({clazz: "page"}),
                        moon: () => MoonPage.template({clazz: "page"}),
                        cat: () => CatsPage.template({clazz: "page"}),
                        settings: () => SettingsPage.template({clazz: "page"}),
                    }, this.controllers.state.page.value)
            }
            ${this.controllers.menuController.render()}
        `;
    }
}
