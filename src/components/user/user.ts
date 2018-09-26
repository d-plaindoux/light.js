import {html, render, TemplateResult} from 'lit-html'
import {Light} from '../../light'

@Light.Custom('sample-user')
export class UserElement extends Light.Element {

    @Light.Property({attribute: "first-name"}) firstName: string;
    @Light.Property({attribute: "last-name"}) lastName: string;
    @Light.Property({observed: true, read: (v) => parseInt(v, 10)}) age: number;

    constructor() {
        super();
    }

    update() {
        render(this.template(), this);
    }

    updateLastName(event: Event) {
        this.lastName = (event.target as HTMLInputElement).value;
    }

    template(): TemplateResult {
        const {firstName, lastName, age, updateLastName} = this;

        return html`
            <div class="user">
                <div>${firstName} ${lastName} aged ${age}</div>
                <div><input type="string" value=${lastName} @change="${updateLastName.bind(this)}"></div>
            </div>
        `;
    }

}
