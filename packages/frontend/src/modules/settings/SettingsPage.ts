import {css, html, LitElement, PropertyValues} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {consume} from "@lit-labs/context";
import {type ApplicationContext, applicationContext} from "../../ApplicationContext";

declare global {
    interface HTMLElementTagNameMap {
        "settings-page": SettingsPage;
    }
}

@customElement("settings-page")
export class SettingsPage extends LitElement {
    private timeout: number = 0;

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

            .blend {
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.25);

                .photo {
                    width: 100%;
                    height: 100%;
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                    border: solid black 5px ;
                }
            }
        }
    `;


    @consume({context: applicationContext, subscribe: true})
    accessor controllers!: ApplicationContext;

    @state()
    accessor url: string | null = JSON.parse(localStorage.getItem("photo") ?? "null");

    connectedCallback() {
        super.connectedCallback();
        this.next();
    }

    disconnectedCallback() {
        clearTimeout(this.timeout);
        super.disconnectedCallback();
    }

    protected updated(_changedProperties: PropertyValues) {
        super.updated(_changedProperties);
        localStorage.setItem("photo", JSON.stringify(this.url));
    }

    async next() {
        clearTimeout(this.timeout);
        this.url = await this.controllers.photoController.getPhotoUrl();
        this.timeout = setTimeout(() => this.next(), 60000) as any;
    }

    render() {
        return html`
            <div class="content" style="background-image: url('${this.url}')" @click=${() => this.next()}>
                <div class="blend">
                    <div class="photo" style="background-image: url('${this.url}')">

                    </div>
                </div>
            </div>`
    }
}
