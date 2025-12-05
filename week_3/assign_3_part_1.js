const fs = require('fs');
const path = require("path");
const {createGzip} = require('zlib');
//1. Use a readable stream to read a file

// //2. Use readable and writable streams to copy
const dataPath = path.resolve('./data.txt')
const writePath = path.resolve('./written_data.txt');
const zipPath = path.resolve('./zipfile.txt.gz')

function readFile(src) {
    const readStream = fs.createReadStream(src, {
        encoding: "utf-8",
        highWaterMark: 50
    });

    readStream.on("data", (chunk) => {
        console.log(chunk);
        console.log("===============================")
    });
    readStream.on("error", (err) => {
        console.log(err);
    });
    readStream.on("close", () => {
        console.log("Stream Closed")
    });
};
// readFile(dataPath);

function copyFile(src,dest){

    const readStream = fs.createReadStream(src, {
        encoding: "utf-8",
        highWaterMark: 50
    });

    const writeStream = fs.createWriteStream(dest, {
    encoding: "utf-8"
})

 readStream.on("data", (chunk) => {
        writeStream.write(chunk);
        
    });
    readStream.on("error", (err) => {
        console.log(err);
    });
writeStream.on("error", (err)=>{
    console.log("write Error : ", err)
});
writeStream.on("close",()=>{
    console.log("file had written")
})
}
// copyFile(dataPath,writePath)

function compressFile(src, dest) {
    const readable = fs.createReadStream(src);
    const gzip = createGzip();
    const writableZip = fs.createWriteStream(dest);

    readable
        .pipe(gzip)
        .pipe(writableZip)
        .on('finish', () => {
            console.log(`File compressed to ${dest}`);
        });

    readable.on('error', (err) => console.log("Read error:", err));
    writableZip.on('error', (err) => console.log("Write error:", err));
}
// compressFile(dataPath,zipPath)
