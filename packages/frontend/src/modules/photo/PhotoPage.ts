import {css, html, LitElement, PropertyValues} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {consume} from "@lit-labs/context";
import {type ApplicationContext, applicationContext} from "../../ApplicationContext";
import {ifUndefined} from "../../utils/ifDefined";

declare global {
    interface HTMLElementTagNameMap {
        "photo-page": PhotoPage;
    }
}

@customElement("photo-page")
export class PhotoPage extends LitElement {
    private timeout: number = 0;
    private temporaryURL: string = "https://photos.app.goo.gl/";

    static template({clazz}: { clazz: string }) {
        return html`
            <photo-page class=${clazz}>

            </photo-page>
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
                    border: solid black 5px;
                }
            }

            .input {
                position: absolute;
                font-size: 32px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 80%
            }

            .confirm {
                position: absolute;
                font-size: 32px;
                left: 50%;
                top: calc(50% + 50px);
                transform: translate(-50%, -50%);
                width: 80%
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
            <div class="content" style="background-image: url('${this.url}')">
                <div class="blend" @click=${() => this.next()}>
                    <div class="photo" style="background-image: url('${this.url}')">
                    </div>
                </div>
                ${ifUndefined(this.controllers.state.photoUrl.value, () =>
                        html`<input class="input"
                                    type="text"
                                    .value=${this.temporaryURL}
                                    @input=${(e: Event) => this.temporaryURL = (e.target as HTMLInputElement).value}
                                    @blur=${(e: Event) => this.controllers.menuController.blur(e.target as HTMLInputElement)}
                                    @focus=${(e: Event) => this.controllers.menuController.focus(e.target as HTMLInputElement)}
                        /><br/>
                        <button
                                class="confirm"
                                @click="${(e: Event) => {
                                    this.controllers.state.photoUrl.value = this.temporaryURL;
                                    this.requestUpdate()
                                    this.next();
                                }}"
                        >Confirm
                        </button>`)}
            </div>
        `
    }
}
