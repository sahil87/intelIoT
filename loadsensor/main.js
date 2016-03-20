/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
A simple node.js application intended to read data from Analog pins on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
*/

var mraa = require('mraa'); //require mraa
var connect = require('./connect');
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console
var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
var analogPin1 = new mraa.Aio(1);
var i = 1;

   var touch_sensor_value = 0, last_t_sensor_value;

    //Touch Sensor connected to D2 connector
    var digital_pin_D2 = new mraa.Gpio(2);
    digital_pin_D2.dir(mraa.DIR_IN);

    //Buzzer connected to D6 connector
    var digital_pin_D6 = new mraa.Gpio(6);
    digital_pin_D6.dir(mraa.DIR_OUT);

    digital_pin_D6.write(0);

    var lcd = require('jsupm_i2clcd');
    var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
//List of Sensors:
//- Load Cell + HX711 
//- Tactile switch (To be replaced by pressure switch)
//- IR Distance Interruptor
//- Touch Sensor for Manual override
//- Buzzer for notification
//- Display for notification/checks


function getPinValue() {
    var analogValue = analogPin0.read(); //read the value of the analog pin
    // console.log(analogValue); //write the value of the analog pin to the console
    return analogValue;
}

function getIRValue() {
     var IRValue = analogPin1.read(); //read the value of the analog pin
     console.log(IRValue); //write the value of the analog pin to the console
    return IRValue;

}



function getValue(i){
  if (i===1){
    return getPinValue();
  }
  if (i===2){
    return getIRValue();
  }

}
var currentObject = 1;
function uploadValue() {
    var_tcount = 0;
    var check_touch = setInterval(function(){
        var_tcount += 1;
        touch_sensor_value = digital_pin_D2.read();
        if (touch_sensor_value === 1 && last_t_sensor_value === 0) {
            console.log("Buzz ON!!!");
            digital_pin_D6.write(touch_sensor_value);
            var object1 = {weight: 0, createTime: new Date(), containerNo: 2};
            console.log('Inserting: ', JSON.stringify(object1));
            connect.insert(object1, function onInsert() {
                console.log("MUST BUY OBJECT 2!!");
                printText(display, 250, 50, 50,"MUST BUY OBJECT2","REMIND ME!            ")
            });

        } else if (touch_sensor_value === 0 && last_t_sensor_value === 1) {
            console.log("Buzz OFF!!!");
            digital_pin_D6.write(touch_sensor_value);
        }
        last_t_sensor_value = touch_sensor_value;
        if (var_tcount>5){
            var_tcount = 0;
            clearInterval(check_touch);
        }
    }, 500);
    i = incrementI(i);
    var object = {weight: getValue(i), createTime: new Date(), containerNo: i};
    console.log('Inserting: ', JSON.stringify(object));
    connect.insert(object, function onInsert() {
        setTimeout(uploadValue, 2500);
    });
}

function do_nothing(){
  return;
}
function incrementI(i) {
    i++;
    if(i>2) {
        i=1;
    }
    return i;
}

function printText(display, r, g, b,line1,line2) {
    var red = r||0;
    var green = g||0;
    var blue = b||0;
    var text = line1||'';
    var text2 = line2||'';
    display.setColor(red, green, blue);
    setInterval(function() {
        display.setColor(red, green, blue);
        display.setCursor(0,0);
        display.write(text);
        display.setCursor(1,0);
        display.write(text2);  // extra padding clears out previous text
    }, 1000);
}

/**
 * Use the upm library to drive the two line display
 *
 * Note that this does not use the "lcd.js" code at all
 */
function useUpm() {

//    display.setCursor(1, 1);
    display.setColor(0,0,254);
    display.setCursor(0,0);
    display.write('Welcome to Intel');
    display.setCursor(1,0);
    display.write('IOT Hackathon 2016');
//    crap
    setTimeout(function(){do_nothing();}, 5000);
    display.setCursor(0,0);
    display.setColor(0,254,0);
    display.write('Presenting AILA');
    display.setCursor(1,0);
    display.write('Auto Inventory n Logistics Analysis');
//    display.scroll
//    display.setColor(0,0,0);
}


useUpm();

uploadValue();

// setInterval(function() {
//     uploadValue();
// }, 2000);
