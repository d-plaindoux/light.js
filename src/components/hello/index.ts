import {html, render, TemplateResult} from 'lit-html'
import {Light} from '../../light'

@Light.Custom('hello-world')
class HelloElement extends Light.Element {
    @Light.Property({observed:true}) name: string;

    constructor() {
        super();
    }

    update() {
        render(this.template(), this);
    }

    template() : TemplateResult {
        return html`
        <p> Hello ${this.name} </p>
      `;
    }
}