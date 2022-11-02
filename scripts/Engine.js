class __PositionElement {
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
}
export class Asset {
    constructor(img, x, y, width, height) {
        let asset = document.createElement('img');
        asset.style.position = 'absolute';
        asset.src = img;
        asset.style.width = `${width}px`;
        asset.style.height = `${height}px`;
        asset.style.left = `${x}px`;
        asset.style.top = `${y}px`;
        this.posX = x;
        this.posY = y;
        this.posW = width;
        this.posH = height;
        this.asset = asset;
    }
    static createWithRaw(img, x, y, width, height) {
        return new Asset(img, x, y, width, height);
    }
    static createWithPos(img, position) {
        return new Asset(img, position._x, position._y, position._width, position._height);
    }
    append(parent) {
        parent.appendChild(this.asset);
    }
}
export class Resource {
    constructor(name, asset, resourceList) {
        this.count = 0;
        this.name = name;
        this.basAsset = asset;
        let countElement = document.createElement('p');
        countElement.textContent = `${name}: 0`;
        countElement.style.position = 'absolute';
        countElement.style.left = `${asset.posX}px`;
        countElement.style.top = `${asset.posY + asset.posH}px`;
        this.imgElement = asset.asset;
        this.countElement = countElement;
        resourceList.push(this);
    }
    addEvent(event, callback) {
        this.imgElement.addEventListener(event, () => callback());
    }
    append(parent) {
        parent.appendChild(this.imgElement);
        parent.appendChild(this.countElement);
    }
    update() {
        this.countElement.textContent = `${this.name}: ${this.count}`;
    }
    add(count) {
        this.update();
        this.count += count;
        return this.count;
    }
    move(x = -1, y = -1) {
        if (!(x == -1 || y == -1)) {
            this.imgElement.style.left = `${x}px`;
            this.imgElement.style.top = `${y}px`;
            this.basAsset.posX = x;
            this.basAsset.posY = y;
        }
        this.countElement.style.left = `${this.basAsset.posX}px`;
        this.countElement.style.top = `${this.basAsset.posY + this.basAsset.posH}px`;
    }
    save() {
        localStorage.setItem(this.name, this.count.toString());
        return true;
    }
    load() {
        if (this.name in localStorage) {
            this.count = Number(localStorage.getItem(this.name));
            this.update();
            return true;
        }
        return false;
    }
    loadIfSaved() {
        if (this.load())
            return true;
        else
            this.save();
        return false;
    }
}
