export class __PositionElement {
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
    centerX(pos) {
        this._x = pos._x + (pos._width / 2) - (this._width / 2);
    }
    centerY(pos) {
        this._y = pos._y + (pos._height / 2) - (this._height / 2);
    }
    center(pos) {
        this.centerX(pos);
        this.centerY(pos);
    }
    scaleX(scale) {
        this._x -= scale;
        this._width += (scale * 2);
    }
    scaleY(scale) {
        this._y -= scale;
        this._height += (scale * 2);
    }
    scale(scale, scale2) {
        this.scaleX(scale);
        this.scaleY(scale2);
    }
}
