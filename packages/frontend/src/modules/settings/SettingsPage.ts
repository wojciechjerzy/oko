import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {consume} from "@lit-labs/context";
import {type ApplicationContext, applicationContext} from "../../ApplicationContext";

declare global {
    interface HTMLElementTagNameMap {
        "settings-page": SettingsPage;
    }
}

@customElement("settings-page")
export class SettingsPage extends LitElement {

    static template({clazz}: { clazz: string }) {
        return html`
            <settings-page class=${clazz}>

            </settings-page>
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
    `;

    @consume({context: applicationContext, subscribe: true})
    accessor controllers!: ApplicationContext;

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`
            <div class="content">
                <input type="text" .value=${JSON.stringify(this.controllers.state.wifi.value)}/>
            </div>`
    }
}
