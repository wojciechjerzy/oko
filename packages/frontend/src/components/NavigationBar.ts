import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

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

        .content {
            display: flex;
            transform: translateX(-50%);
        }

        .button {
            background-color: rgba(255, 255, 255, .5);
            left: -50px;
            margin: 10px;
            width: 50px;
            height: 50px;
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
    accessor buttons: Button[] = [];

    render() {
        return html`
            <div class="content">
                ${this.buttons.map((button, index, array) => {
                    return html`
                        <div class="button"
                             @click=${() => button.onClick()}>${button.name}
                        </div>
                    `
                })}
            </div>`
    }
}

