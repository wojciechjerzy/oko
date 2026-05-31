import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

declare global {
    interface HTMLElementTagNameMap {
        "clock-number": ClockNumber;
    }
}

@customElement("clock-number")
export class ClockNumber extends LitElement {

    static template({
                        clazz, lastNumber, nextNumber,
                        onClick
                    }: {
        lastNumber: string,
        nextNumber: string,
        clazz: string,
        onClick: () => void
    }) {
        console.log(lastNumber, nextNumber)
        return html`
            <clock-number
                    .lastNumber=${lastNumber}
                    .nextNumber=${nextNumber}
                    class=${clazz}
                    @click=${onClick}
            >
            </clock-number>
        `;
    }

    static styles = css`
        .content {
            position: absolute;
            width: 100%;
            height: 100%;

            .part {
                position: absolute;
                width: 100%;
                height: 50%;
                font-size: 256px;
                overflow: hidden;
                box-sizing: border-box;
                border: 2px solid black;
                background-color: white;

                .font {
                    position: absolute;
                    width: 100%;
                    text-align: center;
                }
            }

            .up {
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                bottom: 50%;

                .font {
                    top: 0px;
                }
            }

            .prev.up {
                transform-origin: center bottom;
            }

            .prev.up.animating {
                animation: prevUpFold .2s linear forwards;
            }

            .next.down {
                transform-origin: center top;
            }

            .next.down.animating {
                transform-origin: center top;
                animation: prevUpFold .2s linear reverse;
            }

            .down {
                border-bottom-left-radius: 20px;
                border-bottom-right-radius: 20px;
                top: 50%;

                .font {
                    bottom: 0px;
                }
            }
        }

        @keyframes prevUpFold {
            0% {
                transform: scaleY(1);
            }
            5% {
                transform: scaleY(0.9877);
            }
            10% {
                transform: scaleY(0.9511);
            }
            15% {
                transform: scaleY(0.8910);
            }
            20% {
                transform: scaleY(0.8090);
            }
            25% {
                transform: scaleY(0.7071);
            }
            30% {
                transform: scaleY(0.5878);
            }
            35% {
                transform: scaleY(0.4540);
            }
            40% {
                transform: scaleY(0.3090);
            }
            45% {
                transform: scaleY(0.1564);
            }
            50% {
                transform: scaleY(0);
            }
            100% {
                transform: scaleY(0);
            }
        }
    `;

    @property({type: String})
    accessor lastNumber: string = "0";

    @property({type: String})
    accessor nextNumber: string = "0";

    updated(changed: Map<string, unknown>) {
        console.log("U;dated");
        const up = this.shadowRoot?.querySelector<HTMLElement>('.prev.up');
        up.classList.remove('animating');
        up.offsetWidth; // reflow wymuszający reset animacji
        up.classList.add('animating');

        const down = this.shadowRoot?.querySelector<HTMLElement>('.next.down');
        down.classList.remove('animating');
        down.offsetWidth; // reflow wymuszający reset animacji
        down.classList.add('animating');
    }

    render() {
        return html`
            <div class="content">
                <div class="part next up" @click=${() => this.changeNumber()}>
                    <div class="font">${this.nextNumber}</div>
                </div>
                <div class="part prev up">
                    <div class="font">${this.lastNumber}</div>
                </div>
                <div class="part prev down">
                    <div class="font">${this.lastNumber}</div>
                </div>
                <div class="part next down">
                    <div class="font">${this.nextNumber}</div>
                </div>
            </div>
        `;
    }

    changeNumber() {
        this.requestUpdate();
    }
}
