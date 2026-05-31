import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {consume} from "@lit-labs/context";
import {type ApplicationContext, applicationContext} from "../../ApplicationContext";
import {ClockNumber} from "./ClockNumber";

declare global {
    interface HTMLElementTagNameMap {
        "clock-page": ClockPage;
    }
}

@customElement("clock-page")
export class ClockPage extends LitElement {

    static template({clazz}: { clazz: string }) {
        return html`
            <clock-page class=${clazz}>

            </clock-page>
        `;
    }

    static styles = css`
        .content {
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
            position: absolute;

            .time {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 650px;
                height: 300px;

                .number {
                    position: absolute;
                    width: 150px;
                    height: 300px;
                }

                .firstHour {
                    left: 0px;
                }

                .secondHour {
                    left: 150px;
                }

                .firstMinute {
                    right: 150px;
                }

                .secondMinute {
                    right: 0px;
                }

            }
        }
    `;

    @consume({context: applicationContext, subscribe: true})
    accessor controllers!: ApplicationContext;

    private lastTime: number = 0;
    private now: number = 0;

    connectedCallback() {
        super.connectedCallback();
        this.controllers.clockController.event.addListener(this.onMinute, this)
        this.onMinute();
    }

    disconnectedCallback() {
        this.controllers.clockController.event.removeListener(this.onMinute, this)
        super.disconnectedCallback();
    }

    onMinute() {
        this.lastTime = this.now;
        this.now = this.controllers.clockController.getTime();
        this.requestUpdate();
    }

    render() {

        const [firstLastHour, secondLastHour] = this.controllers.clockController.getHours(this.lastTime).split("");
        const [firstLastMinute, secondLastMinute] = this.controllers.clockController.getMinutes(this.lastTime).split("");
        const [firstHour, secondHour] = this.controllers.clockController.getHours(this.now).split("");
        const [firstMinute, secondMinute] = this.controllers.clockController.getMinutes(this.now).split("");
        return html`
            Test

            <div class="content">
                <div class="time">
                    ${ClockNumber.template({
                        clazz: "firstHour number",
                        lastNumber: firstLastHour,
                        nextNumber: firstHour,
                        onClick: () => this.controllers.clockController.playHeeHee()
                    })}
                    ${ClockNumber.template({
                        clazz: "secondHour number",
                        lastNumber: secondLastHour,
                        nextNumber: secondHour,
                        onClick: () => this.controllers.clockController.playHeeHee()
                    })}
                    ${ClockNumber.template({
                        clazz: "firstMinute number",
                        lastNumber: firstLastMinute,
                        nextNumber: firstMinute,
                        onClick: () => this.controllers.clockController.playHeeHee()
                    })}
                    ${ClockNumber.template({
                        clazz: "secondMinute number",
                        lastNumber: secondLastMinute,
                        nextNumber: secondMinute,
                        onClick: () => this.controllers.clockController.playHeeHee()
                    })}
                </div>
            </div>

        `
    }
}
