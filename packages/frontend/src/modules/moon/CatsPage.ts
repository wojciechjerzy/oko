import {css, html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';

declare global {
    interface HTMLElementTagNameMap {
        "cats-page": CatsPage;
    }
}

@customElement("cats-page")
export class CatsPage extends LitElement {
    private timeout: number = 0;

    static template({clazz}: { clazz: string }) {
        return html`
            <cats-page class=${clazz}></cats-page>
        `;
    }

    @state()
    private accessor url: string = "";

    connectedCallback() {
        super.connectedCallback();
        this.next();
    }

    async next() {
        const url = `https://api.thecatapi.com/v1/images/search?limit=1`;
        const response = await fetch(url);
        const json = await response.json();
        this.url = json[0].url;
        if (this.isConnected) {
            this.timeout = setTimeout(() => this.next(), 60 * 60 * 1000) as any;
        }
    }

    disconnectedCallback() {
        clearTimeout(this.timeout);
        super.disconnectedCallback();
    }

    static styles = css`
        .content {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
        }
    `;

    render() {
        return html`
            <div class="content" style="background-image: url('${this.url}')"></div>`;
    }
}