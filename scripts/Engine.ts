

class __PositionElement {
    _x: number;
    _y: number;
    _width: number;
    _height: number;


    constructor(x: number, y: number, width: number, height: number) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
}

export class Asset {
    asset: HTMLElement;
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(img: string, x: number, y: number, width: number, height: number) {
        let asset = document.createElement('img');
        asset.style.position = 'absolute';
        asset.src = img;
        asset.style.width = `${width}px`;
        asset.style.height = `${height}px`;
        asset.style.left = `${x}px`;
        asset.style.top = `${y}px`;

        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;

        this.asset = asset;
    }

    static createWithRaw(img: string, x: number, y: number, width: number, height: number): Asset {
        return new Asset(img, x, y, width, height);
    }
    static createWithPos(img: string, position: __PositionElement): Asset {
        return new Asset(img, position._x, position._y, position._width, position._height);
    }

    append(parent: Element) {
        parent.appendChild(this.asset);
    }

}

export class Resource {
    name: string;
    imgElement: HTMLElement;
    countElement: HTMLElement;
    count: number = 0;

    private basAsset: Asset;


    constructor(name: string, asset: Asset, resourceList: Resource[]) {
        this.name = name;
        this.basAsset = asset;

        let countElement = document.createElement('p');
        countElement.textContent = `${name}: 0`;
        countElement.style.position = 'absolute';
        countElement.style.left = `${asset.x}px`;
        countElement.style.top = `${asset.y + asset.h}px`;

        this.imgElement = asset.asset;
        this.countElement = countElement;

        resourceList.push(this);
    }

    addEvent(event: string, callback: Function) {
        this.imgElement.addEventListener(event, ()=> callback());
    }

    append(parent: Element) {
        parent.appendChild(this.imgElement);
        parent.appendChild(this.countElement);
    }

    private update() {
        this.countElement.textContent = `${this.name}: ${this.count}`;
    }

    add(count: number): number {
        this.update()

        this.count += count;
        return this.count;
    }

    move(x: number = -1, y: number = -1) {
        if (!(x == -1 || y == -1)) {
            this.imgElement.style.left = `${x}px`;
            this.imgElement.style.top = `${y}px`;
            this.basAsset.x = x;
            this.basAsset.y = y;
        }
        this.countElement.style.left = `${this.basAsset.x}px`;
        this.countElement.style.top = `${this.basAsset.y + this.basAsset.h}px`;
    }

    save(): boolean {
        localStorage.setItem(this.name, this.count.toString());
        return true;
    }
    load(): boolean {
        if (this.name in localStorage) {
            this.count = Number(localStorage.getItem(this.name));
            this.update();
            return true;
        }
        return false;
    }
    loadIfSaved(): boolean {
        if (this.load()) return true
        else this.save();
        return false;
    }
}

