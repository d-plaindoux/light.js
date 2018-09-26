"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const light_1 = require("../light/light");
let UserElement = class UserElement extends light_1.Light.Element {
    constructor() {
        super();
        this.updateLastName = (event) => {
            this.lastName = event.target.value;
        };
    }
    update() {
        lit_html_1.render(this.template(), this);
    }
    template() {
        const { firstName, lastName, age } = this;
        return lit_html_1.html `
            <div class="user">
                <div>${firstName} ${lastName} aged ${age}</div>
                <div><input type="string" value=${lastName} @change="${this.updateLastName}"></div>
            </div>
        `;
    }
};
__decorate([
    light_1.Light.Property({ attribute: "first-name" })
], UserElement.prototype, "firstName", void 0);
__decorate([
    light_1.Light.Property({ attribute: "last-name" })
], UserElement.prototype, "lastName", void 0);
__decorate([
    light_1.Light.Property({ observed: true, read: (v) => parseInt(v, 10) })
], UserElement.prototype, "age", void 0);
UserElement = __decorate([
    light_1.Light.Custom('sample-user')
], UserElement);
exports.UserElement = UserElement;
