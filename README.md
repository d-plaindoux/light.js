# Light.js

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A small library dedicated to WebComponents.

# Library overview

[source code](https://github.com/d-plaindoux/light.js/blob/master/src/light/index.ts)

## List.Element class

This class shoiuld be inherited when Light decorators are used.
The rendering method called `update` shoud be implemented.

# Decorators

## @Light.Custom 

```
type Extension = { extends: keyof HTMLElementTagNameMap | SVGElementTagNameMap }

function Light.Custom<T extends Light.Element>(string, Extension?): T => T 
```

## @Light.Property

```
type Constructor<T> = new (...args: any[]) => T;
type Properties<T>  = { attribute?: string, observed?: boolean, read?: (string) => T }

function Light.Property<I>(Properties<I>?): <T extends Light.Element>(Constructor<T>) => Constructor<T>
```

# TODO

- support css/html templating in separate file 

- seamless shadow dom usage 

# Small Example

```
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
        <div> Hello ${this.name} </div>
      `
   }
}
```

Such component can be simply instantiated using the dedicated custom element. 

```
<hello-world name='Smith'></hello-world>
``` 

# LICENSE

Copyright 2018 Didier Plaindoux

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
