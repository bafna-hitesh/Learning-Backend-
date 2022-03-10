const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

// console.log(path.join(__dirname, "files", "demo.txt"));
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "demo.txt"),
      "utf8"
    );
    await fsPromises.unlink(path.join(__dirname, "files", "demo.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promise-Write.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promise-Write.txt"),
      "\nI am full Stack Developer"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promise-Write.txt"),
      path.join(__dirname, "files", "promise-complete.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promise-complete.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (error) {
    console.log(error);
  }
};

fileOps();

// fs.writeFile(path.join(__dirname, "demo.txt"), "Hi Hitesh", (err) => {
//     if (err) throw err;
//     console.log("write file succesfull");

//     fs.appendFile(path.join(__dirname, "demo.txt"), "\nBE Comp Student", (err) => {
//         if (err) throw err;
//         console.log("append file succesfull");

//         fs.readFile(path.join(__dirname, "demo.txt"), "utf8", (err, data) => {
//         if (err) throw err;
//           console.log(data);
//         });
//     });
// });

// console.log("hello world");
process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit(1);
});
