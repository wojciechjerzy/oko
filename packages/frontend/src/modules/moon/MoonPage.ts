import {css, html, LitElement, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import moonUrl from '../../assets/moon.jpg?url';

declare global {
    interface HTMLElementTagNameMap {
        "moon-page": MoonPage;
    }
}

@customElement("moon-page")
export class MoonPage extends LitElement {

    static template({clazz}: { clazz: string }) {
        return html`
            <moon-page class=${clazz}></moon-page>
        `;
    }

    static styles = css`
        .content {
            width: 100%;
            height: 100%;
            background-image: url(${unsafeCSS(moonUrl)});
            background-size: cover;
            background-position: center;
        }
    `;

    render() {
        return html`<div class="content"></div>`;
    }
}