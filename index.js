const i2c = require("i2c-bus");
const i2c1 = i2c.openSync(1);
const winston = require("winston");

winston.add(winston.transports.File, {filename: "wand.log"});
winston.remove(winston.transports.Console);

/**
 * Point class.
 * @param {number} x The x coordinate.
 * @param {number} y The y coordinate.
 */
function Point(x, y) { // Point object from one-dolla
    this.X = x;
    this.Y = y;
}

const minGestureTime = 1500; // milliseconds to buffer points for a gesture.
const DS1621_ADDR = 0x58;
const queue = [];
let running = true;
const bfr = new Uint8Array(16);
const Ix = new Uint16Array(4);
const Iy = new Uint16Array(4);


const OneDollar = require("one-dolla");
const recognize = new OneDollar();

(function() {
    const devices = i2c1.scanSync(); // i2cbus devices

// console.log(devices[0] + " decimal " + devices[0].toString(16) + " hex");
// 88dec, 58hex 1011000 bin
// left shift 1 10110000 bin 176 dec B0 hex

    i2c1.writeByteSync(DS1621_ADDR, 0x30, 0x01);
    i2c1.writeByteSync(DS1621_ADDR, 0x30, 0x08);
    i2c1.writeByteSync(DS1621_ADDR, 0x06, 0x90);
    i2c1.writeByteSync(DS1621_ADDR, 0x08, 0xC0);
    i2c1.writeByteSync(DS1621_ADDR, 0x1A, 0x40);
    i2c1.writeByteSync(DS1621_ADDR, 0x33, 0x33);

    while (running) { // ToDo: Maybe make the loop break and shutdown on an exit gesture?
        for(let i =0; i < 16; i++) {
            bfr[i] = 0;
        }

        i2c1.readI2cBlockSync(DS1621_ADDR, 0x36, 16, bfr);
        // console.log(bfr);

        Ix[0] = bfr[1];
        Iy[0] = bfr[2];
        let s = bfr[3];
        Ix[0] += (s & 0x30) <<4;
        Iy[0] += (s & 0xC0) <<2;

        Ix[1] = bfr[4];
        Iy[1] = bfr[5];
        s = bfr[6];
        Ix[1] += (s & 0x30) <<4;
        Iy[1] += (s & 0xC0) <<2;

        Ix[2] = bfr[7];
        Iy[2] = bfr[8];
        s = bfr[9];
        Ix[2] += (s & 0x30) <<4;
        Iy[2] += (s & 0xC0) <<2;

        Ix[3] = bfr[10];
        Iy[3] = bfr[11];
        s = bfr[12];
        Ix[3] += (s & 0x30) <<4;
        Iy[3] += (s & 0xC0) <<2;

        for (let i = 0; i < 4; i++) {
            if(Ix[i] < 1023) {
                queue.push({time: new Date(), point: new Point(Ix[i], Iy[i])});
                // console.log(JSON.stringify(queue[queue.length -1]));
                // console.log("Reg 1: " + Ix[0] + "," + Iy[0] + " Reg 2: " + Ix[1] + "," + Iy[1] + " Reg 3: " + Ix[2] + "," + Iy[2] + " Reg 4: " + Ix[3] + "," + Iy[3]);
                break;
            }
        } // End for loop to evaluation led sensor input
        if (queue.length > 0) {
            // If we have waited long enought, we try to recognize the queue
            let latestTimeStamp = new Date().getTime();
            if (latestTimeStamp - queue[0].time.getTime() > minGestureTime) {
                winston.debug("Buffer size " + queue.length + ". Calling recognize");
                let pointsbfr = queue.map(function(p) {
                    return p.point;
                });
                let result = recognize.Recognize(pointsbfr);
                winston.debug(JSON.stringify(result));

                // If we have a good result - Jackpot
                if (result.Score > .85) {
                    let gestures = [];
                    gestures.push({"name": result.Name, "points": JSON.stringify(pointsbfr)});

                    winston.info(result.Name + " recognized with a confidence of " + result.Score);
                    winston.info(JSON.stringify(gestures));
                    // ToDo: based on the result, this is where we should do intesting activities in the window.

                    queue.length = 0; // Empty the queue for the next run
                    running = false; // We are stopping the loop at this time in order to debug.
                } else {
                    // check to see if we should we shift the queue.
                    // Loop through the queue checking each element to see if it is older than 2500 ms (minGestureTime).
                    // When the element is 2500 ms or less, fall into the if and truncate the previous elements.
                    // then short circuit the loop.
                    for(let j = 0; j < queue.length; j++) {
                        if (latestTimeStamp - queue[j].time.getTime() < minGestureTime || j === queue.length -1) {
                            winston.debug("Truncating the first " + j + " elements from the buffer size " + queue.length);
                            queue.splice(0, j-1);
                            break; // Short Circuit the for loop
                        }
                    }
                }
            } // End if to process a minimally populated buffer of points
        } // End if for queue.length
    } // End while
    i2c1.closeSync();
}());
