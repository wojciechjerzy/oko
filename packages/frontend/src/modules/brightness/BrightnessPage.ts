import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {consume} from "@lit-labs/context";
import {type ApplicationContext, applicationContext} from "../../ApplicationContext";

declare global {
    interface HTMLElementTagNameMap {
        "brightness-page": BrightnessPage;
    }
}

@customElement("brightness-page")
export class BrightnessPage extends LitElement {

    static template({clazz}: { clazz: string }) {
        return html`
            <brightness-page class=${clazz}>

            </brightness-page>
        `;
    }

    static styles = css`
        .content {
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
            position: absolute;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .value {
            font-size: 100px;
        }

        input {
            width: 400px;
            height: 100px;
        }
    `;

    @consume({context: applicationContext, subscribe: true})
    accessor controllers!: ApplicationContext;


    connectedCallback() {
        super.connectedCallback();
        this.controllers.state.brightness.addListener(this.onBrightness, this);
    }

    disconnectedCallback() {
        this.controllers.state.brightness.removeListener(this.onBrightness, this);
        super.disconnectedCallback();
    }

    private onBrightness() {
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="content">
                <div class="value">
                    ${this.controllers.state.brightness.value}%
                </div>
                <div class="value">
                    <input type="range" min="0" max="100" value="${this.controllers.state.brightness.value}"
                           @change=${(e: Event) => this.controllers.state.brightness.value = parseInt((e.target as HTMLInputElement).value)}
                    />
                </div>

            </div>`;
    }
}
