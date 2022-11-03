class __PositionElement {
    constructor(x, y, width = -1, height = -1) {
        this._x = x;
        this._y = y;
        if (width > 0)
            this._width = width;
        if (height > 0)
            this._height = height;
    }
    move(x, y) {
        this._x += x;
        this._y += y;
    }
    moveTo(x, y) {
        this._x = x;
        this._y = y;
    }
}
class __AssetElement extends __PositionElement {
    constructor(type, x, y, w = -1, h = -1) {
        super(x, y, w, h);
        let element = document.createElement(type);
        element.style.position = 'absolute';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${w}px`;
        element.style.height = `${h}px`;
        this.element = element;
    }
    addEvent(event, callback) {
        this.element.addEventListener(event, (event) => callback(event));
    }
    move(x, y) {
        super.move(x, y);
        this.element.style.left = `${this._x}px`;
        this.element.style.top = `${this._y}px`;
    }
    moveTo(x, y) {
        super.moveTo(x, y);
        this.element.style.left = `${this._x}px`;
        this.element.style.top = `${this._y}px`;
    }
    append(parent) {
        parent.appendChild(this.element);
    }
}
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
let mouse;
class __MouseFeatures {
    constructor() {
        if (mouse === undefined) {
            window.addEventListener('mouseover', (e) => {
                this._x = e.x;
                this._y = e.y;
            });
            mouse = this;
        }
    }
}
new __MouseFeatures();
export function getMousePosition() {
    return [mouse._x, mouse._y];
}
export class SaveFeatures {
    static save(name, save) {
        localStorage.setItem(name, save.toString());
        return true;
    }
    static load(name) {
        if (name in localStorage) {
            return Some((localStorage.getItem(name)));
        }
        return None();
    }
    static clear(name) {
        localStorage.removeItem(name);
        return true;
    }
}
export class Image extends __AssetElement {
    constructor(src, x, y, w = -1, h = -1) {
        super('img', x, y, w, h);
        this.element.src = src;
    }
}
export class Text extends __AssetElement {
    constructor(text, x, y, w = -1, h = -1) {
        super('p', x, y, w, h);
        this.text = text;
        this.element.innerText = text;
    }
    updateText(text) {
        this.text = text;
        this.element.innerText = text;
    }
}
