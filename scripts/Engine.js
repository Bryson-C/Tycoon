import { __ElementBase } from './ElementBase.js';
export class Result {
    constructor(value, valid) {
        this.value = value;
        this.valid = valid;
    }
}
function Some(value) {
    return new Result(value, true);
}
function None() {
    return new Result(undefined, false);
}
let mouseFeatures;
let windowFeatures;
class __WindowFeatures {
    constructor() {
        if (windowFeatures === undefined) {
            window.onresize = () => { this._width = window.outerWidth; this._height = window.outerHeight; this._resized = true; };
            this._width = window.innerWidth;
            this._height = window.outerHeight;
            windowFeatures = this;
        }
    }
}
class __MouseFeatures {
    constructor() {
        if (mouseFeatures === undefined) {
            window.addEventListener('mousemove', (e) => {
                this._x = e.x;
                this._y = e.y;
            });
            mouseFeatures = this;
        }
    }
}
new __MouseFeatures();
new __WindowFeatures();
export function getMousePosition() {
    return [mouseFeatures._x, mouseFeatures._y];
}
export function getWindowSize() {
    return [windowFeatures._width, windowFeatures._height];
}
export function windowResized() {
    return windowFeatures._resized;
}
export class SaveFeatures {
    static save(name, save) {
        localStorage.setItem(name, save.toString());
        return true;
    }
    static load(name) {
        if (name in localStorage) {
            if (localStorage.getItem(name) !== undefined && localStorage.getItem(name) !== null)
                return Some((localStorage.getItem(name)));
        }
        return None();
    }
    static loadOr(name, or) {
        let data = this.load(name);
        return (data.valid) ? data.value : or;
    }
    static clear(name) {
        localStorage.removeItem(name);
        return true;
    }
}
export class Image extends __ElementBase {
    constructor(src, x, y, w = -1, h = -1) {
        super('img', x, y, w, h);
        this.element.src = src;
        this.element.alt = 'Image Failed Loading';
        document.body.append(this.element);
    }
}
export class Text extends __ElementBase {
    constructor(text, x, y, w = -1, h = -1) {
        super('p', x, y, w, h);
        this.text = text;
        this.element.innerText = text;
        this.element.style.userSelect = 'none';
        document.body.append(this.element);
    }
    move(x, y) {
        super.move(x, y);
    }
    updateText(text) {
        this.text = text;
        this.element.innerText = text;
    }
}
export function randomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}
