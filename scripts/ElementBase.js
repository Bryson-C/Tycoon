import { __PositionElement } from "./Position.js";
export class __ElementBase extends __PositionElement {
    constructor(type, x, y, w = -1, h = -1) {
        super(x, y, w, h);
        let element = document.createElement(type);
        element.style.position = 'absolute';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${w}px`;
        element.style.height = `${h}px`;
        element.className += 'transitionElement';
        this.displayType = 'inline';
        this.element = element;
    }
    addEvent(event, callback) {
        this.element.addEventListener(event, (event) => callback(event));
    }
    updatePosition() {
        this.element.style.left = `${this._x}px`;
        this.element.style.top = `${this._y}px`;
    }
    updateSize() {
        this.element.style.width = `${this._width}px`;
        this.element.style.height = `${this._height}px`;
    }
    destroy() {
        this.element.remove();
    }
    hide() { this.element.style.display = 'none'; }
    show() { this.element.style.display = this.displayType; }
    move(x, y) {
        super.move(x, y);
        this.updatePosition();
    }
    moveTo(x, y) {
        super.moveTo(x, y);
        this.updatePosition();
    }
    centerX(pos) {
        super.centerX(pos);
        this.updatePosition();
    }
    centerY(pos) {
        super.centerY(pos);
        this.updatePosition();
    }
    center(pos) {
        super.center(pos);
        this.updatePosition();
    }
    scaleX(scale) {
        super.scaleX(scale);
        this.updatePosition();
        this.updateSize();
    }
    scaleY(scale) {
        super.scaleY(scale);
        this.updatePosition();
        this.updateSize();
    }
    scale(scale, scale2) {
        super.scale(scale, scale2);
        this.updatePosition();
        this.updateSize();
    }
}
