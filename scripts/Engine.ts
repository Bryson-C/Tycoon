

class __PositionElement {
    _x: number;
    _y: number;
    _width: number;
    _height: number;


    constructor(x: number, y: number, width: number = -1, height: number = -1) {
        this._x = x;
        this._y = y;
        if (width > 0)
            this._width = width;
        if (height > 0)
            this._height = height;
    }

    move(x: number, y: number) {
        this._x += x;
        this._y += y;
    }
    moveTo(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
}

class __AssetElement extends __PositionElement{
    element: any;

    constructor(type: string, x: number, y: number, w: number = -1, h: number = -1) {
        super(x,y,w,h);

        let element = document.createElement(type);
        element.style.position = 'absolute';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${w}px`;
        element.style.height = `${h}px`;

        this.element = element;
    }

    addEvent(event: string, callback: Function) {
        this.element.addEventListener(event, (event)=> callback(event));
    }

    move(x: number, y: number) {
        super.move(x, y);
        this.element.style.left = `${this._x}px`;
        this.element.style.top = `${this._y}px`;
    }
    moveTo(x: number, y: number) {
        super.moveTo(x, y);
        this.element.style.left = `${this._x}px`;
        this.element.style.top = `${this._y}px`;
    }


    append(parent: Element) {
        parent.appendChild(this.element);
    }

}

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


let mouse: __MouseFeatures;

class __MouseFeatures {
    _x: number;
    _y: number;
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


export function getMousePosition(): number[] {
    return [mouse._x, mouse._y];
}


export class SaveFeatures {
    static save<Type>(name: string, save: Type): boolean {
        localStorage.setItem(name, save.toString());
        return true;
    }
    static load<Type>(name: string): Result<Type> {
        if (name in localStorage) {
            return Some<Type>((localStorage.getItem(name)) as Type);
        }
        return None();
    }
    static clear(name: string): boolean {
        localStorage.removeItem(name);
        return true;
    }
}

export class Image extends __AssetElement {

    constructor(src: string, x: number, y: number, w: number = -1, h: number = -1) {
        super('img', x, y, w, h);

        this.element.src = src;
    }

}

export class Text extends __AssetElement {
    text: string;

    constructor(text: string, x: number, y: number, w: number = -1, h: number = -1) {
        super('p',x,y,w,h);

        this.text = text;
        this.element.innerText = text;
    }

    updateText(text: string) {
        this.text = text;
        this.element.innerText = text;
    }
}