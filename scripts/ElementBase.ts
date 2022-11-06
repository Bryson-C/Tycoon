import { __PositionElement } from "./Position.js";



export class __ElementBase extends __PositionElement {
    element: any;
    private displayType: string;

    constructor(type: string, x: number, y: number, w: number = -1, h: number = -1) {
        super(x,y,w,h);

        let element = document.createElement(type);
        element.style.position = 'absolute';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${w}px`;
        element.style.height = `${h}px`;
        element.className += 'transitionElement'


        this.displayType = 'inline';
        this.element = element;
    }

    addEvent(event: string, callback: Function) {
        this.element.addEventListener(event, (event)=> callback(event));
    }

    private updatePosition() {
        this.element.style.left = `${this._x}px`;
        this.element.style.top = `${this._y}px`;
    }
    private updateSize() {
        this.element.style.width = `${this._width}px`;
        this.element.style.height = `${this._height}px`;
    }

    destroy() {
        this.element.remove()
    }

    hide() { this.element.style.display = 'none'; }
    show() { this.element.style.display = this.displayType; }

    move(x: number, y: number) {
        super.move(x, y);
        this.updatePosition();
    }
    moveTo(x: number, y: number) {
        super.moveTo(x, y);
        this.updatePosition();
    }
    centerX(pos: __PositionElement) {
        super.centerX(pos);
        this.updatePosition();
    }
    centerY(pos: __PositionElement) {
        super.centerY(pos);
        this.updatePosition();
    }
    center(pos: __PositionElement) {
        super.center(pos);
        this.updatePosition();
    }

    scaleX(scale: number) {
        super.scaleX(scale);
        this.updatePosition();
        this.updateSize();
    }

    scaleY(scale: number) {
        super.scaleY(scale);
        this.updatePosition();
        this.updateSize();
    }

    scale(scale: number, scale2: number) {
        super.scale(scale, scale2);
        this.updatePosition();
        this.updateSize();
    }


}
