const fs = require('fs');

process.nextTick(() => {
    setTimeout(() => {
        console.log("Timeout 1")
    }
        , 0);
    console.log("nextTick")
});


fs.readFile(__filename, () => {
    process.nextTick(() => console.log("nextTick in readFile"));
    setTimeout(() => {
        console.log("Timeout 2")
    }, 0);
    Promise.resolve().then(() => console.log("Promise in readFile"));
    setImmediate(() => console.log("Immediate 1"));
});



console.log("Start");

setImmediate(() => console.log("Immediate 2"));

process.nextTick(() => console.log("nextTick 1"));
process.nextTick(() => console.log("nextTick 2"));

console.log("End");