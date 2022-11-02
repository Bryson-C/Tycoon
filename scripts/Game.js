import { Resource, Asset } from './Engine';
let resources = [];
let rockAsset = new Asset('../Image/rock.jpg', 0, 0, 32, 32);
let rocks = new Resource('rocks', rockAsset, resources);
rocks.addEvent('click', function () { rocks.add(1); });
rocks.loadIfSaved();
let nftAsset = new Asset('https://variety.com/wp-content/uploads/2022/08/Steven-Galanis-Bored-Ape-Yacht-Club.png?w=631', 0, 0, 32, 32);
let nft = new Resource('nft', nftAsset, resources);
nft.addEvent('click', function () { nft.add(1); });
nft.loadIfSaved();
let global_tick = setInterval(() => {
    let iter = 0;
    for (let item of resources) {
        item.move(iter * 100, 0);
        item.save();
        iter += 1;
    }
}, 1000);
rocks.append(document.body);
nft.append(document.body);
