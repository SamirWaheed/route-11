"use strict";

var path = require('path');

var fs = require('fs');

var EventEmitter = require("events");

var os = require("os");

var event = new EventEmitter(); //1. Write a function that logs the current file path and directory.

function logCurrentPath() {
  console.log("Current file path:", __filename);
  console.log("Current directory path:", __dirname);
} // logCurrentPath();
//2. Write a function that takes a file path and returns its file name


filePath = __filename;

function getFileName(filePath) {
  console.log(path.basename(filePath));
} // getFileName(filePath);
//3. Write a function that builds a path from an object


var fileObj = {
  dir: "/folder",
  name: "app",
  ext: ".js"
};

function buildPath(_ref) {
  var dir = _ref.dir,
      name = _ref.name,
      ext = _ref.ext;
  console.log(path.resolve(dir, name, ext));
} // buildPath(fileObj);
//4. Write a function that returns the file extension from a given file path


function fileExt(fPath) {
  console.log(path.extname(fPath));
} // fileExt(__filename);
// 5. Write a function that parses a given path and returns its name and ext.


function parser(fPath) {
  var parserResult = path.parse(fPath);
  var name = parserResult.name,
      ext = parserResult.ext;
  console.log(name, "\n", ext);
} // parser(__filename);


function isAbsolutePath(p) {
  console.log(path.isAbsolute(p));
} // isAbsolutePath(__filename);
// 7. Write a function that joins multiple segments


function joindPath() {
  console.log(path.join.apply(path, arguments).replace(/\\/g, '/'));
} //  joindPath("src", "components", "App.js");
// 8. Write a function that resolves a relative path to an absolute one


function rslvToAbs(f_path) {
  console.log(path.resolve(f_path).replace(/\\/g, '/'));
} // rslvToAbs("./index.js");
// 9. Write a function that joins two paths


function mergeTwoPath() {
  console.log(path.join.apply(path, arguments));
} // mergeTwoPath("/folder1","/folder2/file.txt")
//10.  Write a function that deletes a file asynchronously.


function dltFile(file) {
  return regeneratorRuntime.async(function dltFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fs.promises.unlink(file));

        case 3:
          console.log("".concat(file, " Deleted successfully "));
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
} // dltFile('./test.txt')
//Write a function that creates a folder synchronously.


function mkFolder(f_path) {
  try {
    fs.mkdirSync(f_path);
    console.log("folder created");
  } catch (err) {
    console.error(err);
  }
} // mkFolder('./newFolder');
//12.Create an event emitter that listens for a "start"


event.on("syHi", function () {
  console.log("Welcome event triggered");
}); // event.emit("syHi");
//13.  Emit a custom "login" event with a username parameter.

event.on("login", function (usrName) {
  console.log("User logged in : ".concat(usrName));
});

function loginInfo(usrName) {
  event.emit("login", usrName);
} // loginInfo("Sameer");
//4.Read a file synchronously and log its contents. 


try {
  data = fs.readFileSync(filenme, {
    encoding: "utf-8"
  });
  console.log(data);
} catch (error) {} // console.log(err);
//15.  Write asynchronously to a file


fs.writeFile("./async.txt", "new data", function (err) {
  if (err) {
    console.log(err);
  } else {// console.log("tmam")
  }
}); //16.  Check if a directory exists.

function dirExists(f_path) {
  return fs.existsSync(f_path);
} // console.log(dirExists("./test.txt"));
//17.  Write a function that returns the OS platform and CPU architecture.


function osInfo() {
  console.log("CPU architecture : " + '\n' + os.arch() + " platform : " + os.platform());
} // osInfo()