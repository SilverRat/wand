Source:
http://translate.google.com/translate?u=http%3A%2F%2Fwww.kako.com%2Fneta%2F2008-009%2F2008-009.html&hl=en&ie=UTF-8&sl=ja&tl=en]http://translate.google.com/translate?u=http%3A%2F%2Fwww.kako.com%2Fneta%2F2008-009%2F2008-009.html&hl=en&ie=UTF-8&sl=ja&tl=en

Just for additional infomation:
wiibrew - http://wiibrew.org/wiki/Wiimote#Sensitivity_Settings

How to use infrared sensor of Wii remote control 

I will simply write a commentary on how to use the sensor. 

In the protocol of the I 2 C bus standard, it is necessary to first transmit the address number of the device to communicate with the device. 
The address of the infrared sensor used for the Wii remote control is 0x58. 
The source code is written as 0xB0 because it shifts so that the upper 7 bits are the address and the lower 1 bit is the R / W designation bit. 


Initialization of the sensor is simpler than accessing the sensor inside the Wii remote via Bluetooth . 
This is because chip enable control and ON / OFF control of the clock oscillation circuit are not performed. 

Commands for initialization are transmitted in the following format. 
[START condition] [0xB0] [control register address] [write data] [STOP condition] 
The address of the control register is specified by 8 bits. 
I do not know exactly which address is what function. 
In the meantime, you can operate the sensor by writing with certain fixed values ​​and procedures. 


Initialization command procedure 
(1) Write data 0x01 to control register address 0x30 
(2) Write data 0x08 to control register address 0x30 
(3) Write data 0x90 to control register address 0x06 
(4) Write data 0xC0 to control register address 0x08 
(5) Write data 0x40 to control register address 0x1A 
(6) Write data 0x33 to control register address 0x33 
This is explained below It seems that it seems to be a simplified procedure of sensitivity setting to do. 


How to set the sensitivity of the infrared sensor seems to be set up simply as above, 
but if you want to set it properly, 
specify the four parameters p0, p1, p2, p3 and write in the following procedure 
(1) Write data 0x01 to control register address 0x30 
(2) Write data 0x02, 0x00, 0x00, 0x71, 0x01, 0x00, p0 to control register address 0x00 (write 7 bytes) 
(3) Write data 0x00, p1 to control register address 0x07 (write 2 bytes) 
(4) Write data p2, p3 to control register address 0x1A (write 2 bytes) 
(5) Write data 0x03 to control register address 0x33 
(6) Write control data 0x08 to control register address 0x30 When registering multiple bytes, register address is automatically incremented, so it can be written continuously . 

As for the sensitivity parameter, 
 
For sensitivity 1, p0 = 0x72, p1 = 0x20, p2 = 0x1F, p3 = 0x03 
For sensitivity 2, p0 = 0xC8, p1 = 0x36, p2 = 0x35, p3 = 0x03 
For sensitivity 3, p0 = 0xAA, p1 = 0x64, p2 = 0x63, p3 = 0x03 
For sensitivity 4, p0 = 0x96, p1 = 0xB4, p2 = 0xB3, p3 = 0x04 
For sensitivity 5, p0 = 0x96, p1 = 0xFE, p2 = 0xFE, p3 = 0x05 


After initialization (after sensitivity setting), the coordinates of the light spot detected by the sensor can be read out. 

Sensor output readout method [START condition] [0xB0] [0x36] [STOP Contention] 
After sending the command saying, read as follows. 
[START condition] [0xB1] [Read data] x 16 bytes 


The format of the read data is stored in the following order by 3 bytes each. 
[Start 1 byte] [Coordinate 1 ... 3 bytes] [Coordinate 2 ... 3 bytes] [Coordinate 3 ... 3 bytes] [Coordinate 4 ... 3 bytes] 

Assuming that these three bytes are XX, YY, SS, 
X coordinate = (SS & 0x30) << 4 + XX 
Y coordinate = (SS & 0xC 0) << 2 + YY 
By doing the calculation, you can get the value of the coordinates. 

When the coordinate value is invalid, 0x3FF is returned. 


Role of control register Address 0x00 to 0x08 --- Parameter setting for detection Address 0x1A to 0x1B --- Parameter setting for detection (2) 
Address 0x30 --- Sensor operation mode (?) Write 0x01 first, then write 0x08 Address 0x33 --- Write sensor operating mode (?) 0x03 (or 0x33?) 


Parameter setting for detection Unknown Parameter setting of the software inside the sensor for image processing of the image taken by the camera to detect the light spot Parameters such as the threshold value for binarization and the threshold value of the size of the light spot are It is speculated that there is something. 



(Categories revised 2008-10-06) 
Several parameters seem to be known. 
There are various kinds of information on the page called http://wiki.wiimoteproject.com/IR_Sensor . 


