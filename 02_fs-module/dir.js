const fs = require("fs");

if (!fs.existsSync("./test-dir")) {
  fs.mkdir("./test-dir", (err) => {
    if (err) throw err;
    console.log("Directory created");
  });
}

if (fs.existsSync("./test-dir")) {
  fs.rmdir("./test-dir", (err) => {
    if (err) throw err;
    console.log("Directory remove");
  });
}
