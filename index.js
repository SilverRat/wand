//Notes: Update dollar.js with constructor.  Update export.js with init parameter


var i2c = require('i2c-bus'),
  i2c1 = i2c.openSync(1);

//
// Point class
//
function Point(x, y) // constructor
{
	this.X = x;
	this.Y = y;
}

var DS1621_ADDR = 0x58,
  x = 0,
  devices,
  bfr = new Uint8Array(16),
  Ix = new Uint16Array(4),
  Iy = new Uint16Array(4);


const OneDollar = require('one-dolla');
console.log(typeof(OneDollar));
const recognize = new OneDollar([{name: "triangle", points: new Array(new Point(137,139),new Point(135,141),new Point(133,144),new Point(132,146),new Point(130,149),new Point(128,151),new Point(126,155),new Point(123,160),new Point(120,166),new Point(116,171),new Point(112,177),new Point(107,183),new Point(102,188),new Point(100,191),new Point(95,195),new Point(90,199),new Point(86,203),new Point(82,206),new Point(80,209),new Point(75,213),new Point(73,213),new Point(70,216),new Point(67,219),new Point(64,221),new Point(61,223),new Point(60,225),new Point(62,226),new Point(65,225),new Point(67,226),new Point(74,226),new Point(77,227),new Point(85,229),new Point(91,230),new Point(99,231),new Point(108,232),new Point(116,233),new Point(125,233),new Point(134,234),new Point(145,233),new Point(153,232),new Point(160,233),new Point(170,234),new Point(177,235),new Point(179,236),new Point(186,237),new Point(193,238),new Point(198,239),new Point(200,237),new Point(202,239),new Point(204,238),new Point(206,234),new Point(205,230),new Point(202,222),new Point(197,216),new Point(192,207),new Point(186,198),new Point(179,189),new Point(174,183),new Point(170,178),new Point(164,171),new Point(161,168),new Point(154,160),new Point(148,155),new Point(143,150),new Point(138,148),new Point(136,148))},
        {name:"x", points: new Array(new Point(87,142),new Point(89,145),new Point(91,148),new Point(93,151),new Point(96,155),new Point(98,157),new Point(100,160),new Point(102,162),new Point(106,167),new Point(108,169),new Point(110,171),new Point(115,177),new Point(119,183),new Point(123,189),new Point(127,193),new Point(129,196),new Point(133,200),new Point(137,206),new Point(140,209),new Point(143,212),new Point(146,215),new Point(151,220),new Point(153,222),new Point(155,223),new Point(157,225),new Point(158,223),new Point(157,218),new Point(155,211),new Point(154,208),new Point(152,200),new Point(150,189),new Point(148,179),new Point(147,170),new Point(147,158),new Point(147,148),new Point(147,141),new Point(147,136),new Point(144,135),new Point(142,137),new Point(140,139),new Point(135,145),new Point(131,152),new Point(124,163),new Point(116,177),new Point(108,191),new Point(100,206),new Point(94,217),new Point(91,222),new Point(89,225),new Point(87,226),new Point(87,224))},
        {name: "rectangle", points: new Array(new Point(78,149),new Point(78,153),new Point(78,157),new Point(78,160),new Point(79,162),new Point(79,164),new Point(79,167),new Point(79,169),new Point(79,173),new Point(79,178),new Point(79,183),new Point(80,189),new Point(80,193),new Point(80,198),new Point(80,202),new Point(81,208),new Point(81,210),new Point(81,216),new Point(82,222),new Point(82,224),new Point(82,227),new Point(83,229),new Point(83,231),new Point(85,230),new Point(88,232),new Point(90,233),new Point(92,232),new Point(94,233),new Point(99,232),new Point(102,233),new Point(106,233),new Point(109,234),new Point(117,235),new Point(123,236),new Point(126,236),new Point(135,237),new Point(142,238),new Point(145,238),new Point(152,238),new Point(154,239),new Point(165,238),new Point(174,237),new Point(179,236),new Point(186,235),new Point(191,235),new Point(195,233),new Point(197,233),new Point(200,233),new Point(201,235),new Point(201,233),new Point(199,231),new Point(198,226),new Point(198,220),new Point(196,207),new Point(195,195),new Point(195,181),new Point(195,173),new Point(195,163),new Point(194,155),new Point(192,145),new Point(192,143),new Point(192,138),new Point(191,135),new Point(191,133),new Point(191,130),new Point(190,128),new Point(188,129),new Point(186,129),new Point(181,132),new Point(173,131),new Point(162,131),new Point(151,132),new Point(149,132),new Point(138,132),new Point(136,132),new Point(122,131),new Point(120,131),new Point(109,130),new Point(107,130),new Point(90,132),new Point(81,133),new Point(76,133))}]);
console.log(recognize.Unistrokes.length);
var result = recognize.Recognize([{ X: 1, Y: 2}, {X: 10, Y: 3}, { X: 12, Y: 27} , {X: 3, Y: 25}, { X: 0, Y: 0} ]);
console.log(result);

result = recognize.Recognize(
[{ X: 140.17500305175776, Y: 420.52500915527327 }, { X: 157.69687843322748, Y: 385.4812583923338 }, { X: 175.2187538146972, Y: 350.4375076293944 }, { X: 192.7406291961669, Y: 315.39375686645496 }, { X: 210.26250457763663, Y: 280.3500061035155 }, { X: 227.78437995910636, Y: 245.30625534057606 }, { X: 245.30625534057606, Y: 210.26250457763663 }, { X: 262.8281307220458, Y: 175.2187538146972 }, { X: 280.3500061035155, Y: 140.17500305175776 }, { X: 280.3500061035155, Y: 140.17500305175776 }, { X: 297.87188148498524, Y: 175.2187538146972 }, { X: 315.39375686645496, Y: 210.26250457763663 }, { X: 332.9156322479247, Y: 245.30625534057606 }, { X: 350.4375076293944, Y: 280.3500061035155 }, { X: 367.95938301086414, Y: 315.39375686645496 }, { X: 385.4812583923338, Y: 350.4375076293944 }, { X: 403.00313377380354, Y: 385.4812583923338 }, { X: 420.52500915527327, Y: 420.52500915527327 }, { X: 420.52500915527327, Y: 420.52500915527327 }, { X: 385.4812583923338, Y: 420.52500915527327 }, { X: 350.4375076293944, Y: 420.52500915527327 }, { X: 315.39375686645496, Y: 420.52500915527327 }, { X: 280.3500061035155, Y: 420.52500915527327 }, { X: 245.30625534057606, Y: 420.52500915527327 }, { X: 210.26250457763663, Y: 420.52500915527327 }, { X: 175.2187538146972, Y: 420.52500915527327 }, { X: 140.17500305175776, Y: 420.52500915527327}]);

console.log(result);

(function () {
 
   console.log('i2cdetect');
   devices = i2c1.scanSync();
   console.log(devices[0] + ' decimal ' + devices[0].toString(16) + ' hex');
    // 88dec, 58hex 1011000 bin
    // left shift 1 10110000 bin  176 dec B0 hex
   console.log('Starting');
 
    console.log(DS1621_ADDR << 1);

    //var send = new Uint8Array(2);
    //send[0] = 0x30;
    //send[1] = 0x01;
    //i2c1.i2cWriteSync(DS1621_ADDR,2,send);
    //console.log('buffer length: ' + send.length);
    
    i2c1.writeByteSync(DS1621_ADDR,0x30,0x01);
    i2c1.writeByteSync(DS1621_ADDR,0x30,0x08);
    i2c1.writeByteSync(DS1621_ADDR,0x06,0x90);
    i2c1.writeByteSync(DS1621_ADDR,0x08,0xC0);
    i2c1.writeByteSync(DS1621_ADDR,0x1A,0x40);
    i2c1.writeByteSync(DS1621_ADDR,0x33,0x33);
 
    console.log('Init done');

    //i2c1.writeByteSync(DS1621_ADDR, 0x36, 0x00);
    //i2c1.sendByteSync(DS1621_ADDR, 0x36);

    //bfr = i2c1.readByteSync(0x58, 0x36);
    Ix[0] = 1023;
    while (Ix[0] == 1023){

        for(var i =0;i < 16;i++){
            bfr[i] = 0;
        }

        i2c1.readI2cBlockSync(DS1621_ADDR, 0x36, 16, bfr);
        //console.log(bfr);

        Ix[0] = bfr[1];
        Iy[0] = bfr[2];
        s   = bfr[3];
        Ix[0] += (s & 0x30) <<4;
        Iy[0] += (s & 0xC0) <<2;
        
        Ix[1] = bfr[4];
        Iy[1] = bfr[5];
        s   = bfr[6];
        Ix[1] += (s & 0x30) <<4;
        Iy[1] += (s & 0xC0) <<2;

        Ix[2] = bfr[7];
        Iy[2] = bfr[8];
        s   = bfr[9];
        Ix[2] += (s & 0x30) <<4;
        Iy[2] += (s & 0xC0) <<2;

        Ix[3] = bfr[10];
        Iy[3] = bfr[11];
        s   = bfr[12];
        Ix[3] += (s & 0x30) <<4;
        Iy[3] += (s & 0xC0) <<2;

        if(Ix[0] < 1023){
            console.log('Reg 1: ' + Ix[0] + ',' + Iy[0] + ' Reg 2: ' + Ix[1] + ',' + Iy[1] + ' Reg 3: ' + Ix[2] + ',' + Iy[2] + ' Reg 4: ' + Ix[3] + ',' + Iy[3]);
            Ix[0] = 1023;
        }
    } 

    i2c1.closeSync();
}());