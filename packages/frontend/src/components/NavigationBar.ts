import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

export type Button =
    {
        name: string
        onClick: () => void
    }

@customElement("navigation-bar")
export class NavigationBar extends LitElement {

    static template({
                        clazz,
                        buttons,
                        numberOfButtons
                    }: {
        clazz: string;
        buttons: Button[],
        numberOfButtons: number
    }) {
        return html`
            <navigation-bar
                    class=${clazz}
                    .buttons=${buttons}
                    .numberOfButtons=${numberOfButtons}
            >
            </navigation-bar>`
    }

    static styles = css`
        :host {
            pointer-events: none;
        }

        .content {
            display: flex;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 50%);
            mask: url("#navigation-mask");
            -webkit-mask: url("#navigation-mask");
            clip-path: url("#navigation-clipPath");
            -webkit-clip-path: url("#navigation-clipPath");
            pointer-events: all;
        }

        .contentBorder {
            position: absolute;
            width: 890px;
            height: 890px;
            background-color: rgba(255, 255, 255, 50%);
            border-radius: 500px;
            left: 50%;
            top: 50%;
            translate: -50% -50%;
        }

        .button {
            --alfa: calc(360deg / var(--steps));
            --sin: sin(0.5 * var(--alfa));
            --cos: cos(0.5 * var(--alfa));
            left: 50%;
            top: 50%;
            position: absolute;
            cursor: pointer;
            clip-path: polygon(0px 0px, 600px 0px, calc(cos(var(--alfa)) * 600px) calc(sin(var(--alfa)) * 600px));
            rotate: calc(var(--step) * var(--alfa));

            .buttonBackground {
                position: absolute;
                width: 600px;
                height: 600px;
            }

            .buttonLabel {
                position: absolute;
                left: calc(var(--cos) * 490px);
                top: calc(var(--sin) * 490px);
                translate: -50% -50%;
                rotate: calc(var(--step) * var(--alfa) * -1);
                font-size: 64px;
                color: white;
            }
        }


    }
    `;

    @property({type: Array})
    accessor buttons: Button[] = [];

    @property({type: Number})
    accessor numberOfButtons: number = 24;

    render() {
        return html`
            <div class="content">

                ${this.buttons.map((button, index, array) => {
                    return html`
                        <div
                                class="button"
                                style="--step:${index}; --steps:${this.numberOfButtons}"
                                @click=${() => button.onClick()}>
                            <div class="buttonBackground"></div>
                            <div class="buttonLabel">${button.name}</div>
                        </div>
                    `
                })}
                <svg width="0" height="0">
                    <defs>
                        <mask id="navigation-mask">
                            <rect width="1080" height="1080" fill="black"/>

                            <circle
                                    cx="540"
                                    cy="540"
                                    r="540"
                                    fill="white"
                            />

                            <circle
                                    cx="540"
                                    cy="540"
                                    r="440"
                                    fill="black"
                            />
                        </mask>
                        <clipPath id="navigation-clipPath">
                            <path
                                    fill-rule="evenodd"
                                    d="
          M540,540
          m-540,0
          a540,540 0 1,0 1080,0
          a540,540 0 1,0 -1080,0

          M540,540
          m-440,0
          a440,440 0 1,1 880,0
          a440,440 0 1,1 -880,0
        "
                            />
                        </clipPath>
                    </defs>
                </svg>
                <div class="contentBorder"></div>
            </div>
        `
    }


}

