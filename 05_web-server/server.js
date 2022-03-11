const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 8000;

const serveFile = async (filePath, contentType, res) => {
  try {
    const data = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf-8" : ""
    );
    res.writeHead(200, { "Content-Type": contentType });
    res.end(
      contentType === "application/json"
        ? JSON.stringify(JSON.parse(data))
        : data
    );
  } catch (error) {
    console.log(error);
    myEmitter.emit("log", `${error.name}\t${error.message}`, "errlog.txt");

    res.statusCode = 500;
    res.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "relog.txt");

  let contentType;

  const extention = path.extname(req.url);

  switch (extention) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  //makes .html extn not req in browser
  if (!extention && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExist = fs.existsSync(filePath);

  if (fileExist) {
    serveFile(filePath, contentType, res);
  } else {
    serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
  }
});
server.listen(PORT, () => console.log(`server listning on port ${PORT}`));
