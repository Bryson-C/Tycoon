

export class __PositionElement {
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

    centerX(pos: __PositionElement) {
        this._x = pos._x + (pos._width/2) - (this._width/2);
    }

    centerY(pos: __PositionElement) {
        this._y = pos._y + (pos._height/2) - (this._height/2);
    }

    center(pos: __PositionElement) {
        this.centerX(pos);
        this.centerY(pos);
    }

    scaleX(scale: number) {
        this._x -= scale;
        this._width += (scale * 2);
    }

    scaleY(scale: number) {
        this._y -= scale;
        this._height += (scale * 2);
    }

    scale(scale: number, scale2: number) {
        this.scaleX(scale);
        this.scaleY(scale2);
    }

}
