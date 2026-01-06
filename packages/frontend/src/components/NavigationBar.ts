import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from "../utils/ifDefined.js";

export type Button =
    {
        name: string
        onClick: () => void
    }

@customElement("navigation-bar")
export class NavigationBar extends LitElement {
    static styles = css`
        :host {

        }

        .button {
            position: absolute;
            left: 50%;
            top: 50%;
        }

        .buttonContent {
            position: absolute;
            background-color: rgba(255, 255, 255, .5);
            left: -50px;
            top: calc(-50px + 490px);
            width: 100px;
            height: 100px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            border: solid 1px;
            border-radius: 50px;
            cursor: pointer;
        }
    `;

    @property({type: Array})
    accessor buttons!: Button[];

    render() {
        return ifDefined(this.buttons, buttons => {
            return buttons.map((button, index, array) => {
                return html`
                    <div class="button" style="rotate:${index * 20}deg">
                        <div class="buttonContent" style="rotate:${-index * 20}deg"
                             @click=${() => button.onClick()}>${button.name}
                        </div>
                    </div>`
            })
        });
    }
}

