console.log("hello world");

/** How NODE differ from vanila js
 * 1) NODE runs on server not on browser (backend)
 * 2) console is in the terminal window
 * 3) GLOBAL object insted of WINDOW object
 * 4) common core modules
 * 5) CommonJS module instead of ES6 module
 */

// console.log(global);

// const os = require("os");
// const path = require("path");
const { add, sub } = require("./math");

console.log(add(2, 2));
console.log(sub(2, 2));

// console.log(os.type());
// console.log(os.uptime());
// console.log(os.version());

// console.log(__dirname);
// console.log(__filename);

// console.log(path);
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));
