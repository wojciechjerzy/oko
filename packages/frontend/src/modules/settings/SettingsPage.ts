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

        .settings {
            background-color: white;
            border-radius: 5px;
            width: 400px;
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
        const network = {
            ssid: this.controllers.state.wifi.value.networks[0]?.ssid ?? "",
            psk: this.controllers.state.wifi.value.networks[0]?.psk ?? ""
        };
        return html`
            <div class="content">
                <div>
                    <table class="settings">
                        <tbody>
                        <tr>
                            <td colspan="3">WIFI</td>
                        </tr>
                        <tr>
                            <td>Nazwa:</td>
                            <td>
                                <input type="text"
                                       .value=${network?.ssid}
                                       @focus=${(e: Event) => this.controllers.menuController.focus(e.target as HTMLInputElement)}
                                       @input=${(e: InputEvent) => network.ssid = (e.target as HTMLInputElement).value}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Hasło:</td>
                            <td>
                                <input type="text"
                                       .value=${network?.psk}
                                       @focus=${(e: Event) => this.controllers.menuController.focus(e.target as HTMLInputElement)}
                                       @input=${(e: InputEvent) => network.psk = (e.target as HTMLInputElement).value}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <button @click=${() => {
                                    this.controllers.communicationController.saveWifi(network);
                                    this.controllers.state.wifi.value.networks = [network];
                                }}>Zapisz
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                Dostępne sieci:<br/>
                                ${this.controllers.state.wifi.value.availableNetworks
                                        .sort((a, b) => b.signal - a.signal)
                                        .map(network => html`
                                            <div>${network.ssid}</div>`
                                        )}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>`
    }
}
