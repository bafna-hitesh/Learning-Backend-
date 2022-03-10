const logEvents = require("./logEvents");

const events = require("events");

// class MyEmitter extends EventEmitter {}

const eventEmitter = new events.EventEmitter();

//listen event
eventEmitter.on("log", (msg) => logEvents(msg));

//emit(fire) event
eventEmitter.emit("log", "log Event emitted");
// console.log(myEmitter);
