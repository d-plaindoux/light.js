"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const light_1 = require("../light/light");
const lit_html_1 = require("lit-html");
let UsersElement = class UsersElement extends light_1.Light.Element {
    constructor() {
        super();
        this._users = [
            new model_1.User("John", "Doe", 42),
            new model_1.User("OSS", "117", 33),
        ];
    }
    update() {
        lit_html_1.render(this.template(), this);
        setInterval(() => {
            var element = document.getElementById("user-0");
            element.setAttribute("age", `${parseInt(element.getAttribute("age"), 10) + 1}`);
        }, 2000);
    }
    template() {
        return lit_html_1.html `
            <ul>
            ${this._users.map((user, index) => lit_html_1.html `
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
};
UsersElement = __decorate([
    light_1.Light.Custom('sample-user-set')
], UsersElement);
exports.UsersElement = UsersElement;
