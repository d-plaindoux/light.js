import {UserModel} from "../../models/user"
import {Light} from "../../light";
import {html, render, TemplateResult} from "lit-html";

@Light.Custom('sample-user-set')
export class UsersElement extends Light.Element {

    private _users: UserModel[];

    constructor() {
        super();
        this._users = [
            new UserModel("John", "Doe", 42),
            new UserModel("Smith", "Anon", 33),
        ]
    }

    update(): void {
        render(this.template(), this)
        this._users.forEach((user, index) => {
            setInterval(() => {
                var element = (document.getElementById(`user-${index}`) as UsersElement)
                element.setAttribute("age", `${parseInt(element.getAttribute("age"), 10) + 1}`);
            }, 2000)
        });
    }

    template(): TemplateResult {
        return html`
            <ul>
            ${this._users.map((user, index) =>
            html`
                <li>
                    <sample-user id="user-${index}"
                                 first-name='${user.firstname}' 
                                 last-name='${user.lastname}' 
                                 age='${user.age}'
                    />
                </li>
            `)}
            </ul>
        `;
    }

}
