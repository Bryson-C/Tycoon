
import {Image, SaveFeatures, Text, getMousePosition} from "./Engine.js";

let rockCount: number = 0;
if (SaveFeatures.load('rocks').valid) {
    rockCount = SaveFeatures.load<number>('rocks').value;
}


let rock = new Image('../Image/stone.png', 0, 0, 128, 128);
let rockText = new Text(`Rocks: ${rockCount}`, rock._x, rock._y + rock._height);

rock.addEvent('click', function(){
    rockCount++;
    rockText.updateText(`Rocks: ${rockCount}`);
    SaveFeatures.save<number>('rocks', rockCount)
});


rockText.append(document.body);
rock.append(document.body);