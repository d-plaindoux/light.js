import {Guid} from "./guid";

export module Light {

    /**
     * Basic type definitions
     */
    type Constructor<T> = new (...args: any[]) => T;
    type Properties<T> = { attribute?: string, read?: (value: string) => T, observed?: boolean }
    type Extension = { extends: keyof HTMLElementTagNameMap | SVGElementTagNameMap }

    /**
     * Ugly singleton for the moment
     */
    const OBSERVED: Map<string, Array<String>> = new Map();

    /**
     * Abstract class for Light custom element support
     */
    export abstract class Element extends HTMLElement {

        protected constructor() {
            super();
        }

        static get observedAttributes() {
            return OBSERVED.get(this.name) || [];
        }

        connectedCallback() {
            this.update();
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.update();
        }

        abstract update(): void;
    }

    /**
     * Decorator dedicated to custom element declaration with an optional extension.
     *
     * @param name the tag custom tag name
     * @param extension
     * @constructor
     */
    export function Custom(name: string, extension?: Extension) {
        return <T extends Light.Element>(target: Constructor<T>): any => {
            customElements.define(name, target, (extension && {extends: extension.extends.toString()}) || null);
            return target;
        };

    }

    /**
     * Decorator dedicated to properties.
     * @param description
     * @constructor
     */
    export function Property<I>(description?: Properties<I>) {
        return function <T extends Light.Element, K extends keyof T>(target: T, key: K) {
            if (delete target[key]) {
                let attributeName = (description && description.attribute) || key.toString();
                let attributeReader = (description && description.read) || (v => v);
                let attributeKey = Guid.newGuid();

                const getter = function (this) {
                    let value = this[attributeKey];
                    return value || attributeReader(this.getAttribute(attributeName));
                };

                const setter = function (this: T, newVal) {
                    this[attributeKey] = newVal;
                    this.update();
                };

                Object.defineProperty(target, key, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });

                if (description && description.observed) {
                    let key = target.constructor.name;
                    let value = (OBSERVED.get(target.constructor.name) || []).concat(attributeName);

                    OBSERVED.set(key, value);
                }
            }
        }
    }
}
