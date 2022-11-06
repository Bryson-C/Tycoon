
import { __ElementBase } from './ElementBase.js'


export class Result<Type> {
    value: Type;
    valid: boolean;

    constructor(value: Type, valid: boolean) {
        this.value = value;
        this.valid = valid;
    }
}

function Some<Type>(value: any): Result<Type> {
    return new Result(value, true);
}
function None(): Result<any> {
    return new Result(undefined, false);
}


let mouseFeatures: __MouseFeatures;
let windowFeatures: __WindowFeatures;

class __WindowFeatures {
    _width: number;
    _height: number;
    _resized: boolean;

    constructor() {
        if (windowFeatures === undefined) {
            window.onresize = () => { this._width = window.outerWidth; this._height = window.outerHeight; this._resized = true; }
            this._width = window.innerWidth;
            this._height = window.outerHeight;
            windowFeatures = this;
        }
    }
}
class __MouseFeatures {
    _x: number;
    _y: number;
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

export function getMousePosition(): number[] {
    return [mouseFeatures._x, mouseFeatures._y];
}
export function getWindowSize(): number[] {
    return [windowFeatures._width, windowFeatures._height];
}
export function windowResized(): boolean {
    return windowFeatures._resized;
}


export class SaveFeatures {
    static save<Type>(name: string, save: Type): boolean {
        localStorage.setItem(name, save.toString());
        return true;
    }
    static load<Type>(name: string): Result<Type> {
        if (name in localStorage) {
            if (localStorage.getItem(name) !== undefined && localStorage.getItem(name) !== null)
                return Some<Type>((localStorage.getItem(name)) as Type);
        }
        return None();
    }
    static loadOr<Type>(name: string, or: Type): Type {
        let data = this.load<Type>(name);
        return (data.valid) ? data.value as Type : or;
    }
    static clear(name: string): boolean {
        localStorage.removeItem(name);
        return true;
    }
}

export class Image extends __ElementBase {

    constructor(src: string, x: number, y: number, w: number = -1, h: number = -1) {
        super('img', x, y, w, h);

        this.element.src = src;
        this.element.alt = 'Image Failed Loading';
        document.body.append(this.element);
    }

}

export class Text extends __ElementBase {
    text: string;

    constructor(text: string, x: number, y: number, w: number = -1, h: number = -1) {
        super('p',x,y,w,h);

        this.text = text;
        this.element.innerText = text;
        this.element.style.userSelect = 'none';
        document.body.append(this.element);
    }

    move(x: number, y: number) {
        super.move(x, y);
    }

    updateText(text: string) {
        this.text = text;
        this.element.innerText = text;
    }
}


export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
}


