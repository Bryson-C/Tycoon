import { Resource, Asset } from "./Engine.js";
let resources = [];
let rockAsset = new Asset('../Image/rock.jpg', 0, 0, 32, 32);
let rocks = new Resource('rocks', rockAsset, resources);
rocks.addEvent('click', function () { rocks.add(1); });
rocks.loadIfSaved();
rocks.move(32, 32);
let nftAsset = new Asset('https://variety.com/wp-content/uploads/2022/08/Steven-Galanis-Bored-Ape-Yacht-Club.png?w=631', 100, 100, 32, 32);
let nft = new Resource('nft', nftAsset, resources);
nft.addEvent('click', function () { nft.add(1); });
nft.loadIfSaved();
nft.move(96, 32);
let global_tick = setInterval(() => {
    let iter = 0;
    for (let item of resources) {
        item.save();
        iter += 1;
    }
}, 1000);
rocks.append(document.body);
nft.append(document.body);
