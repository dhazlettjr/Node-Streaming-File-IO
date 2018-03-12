#!/usr/bin/env node

const { readFileSync } = require("fs");

const [,,fileArg] = process.argv;

if (fileArg) {
  try {
    const data = readFileSync(fileArg);
    process.stdout.write(data.toString());
  } catch (err) {
    console.log("Error", err)
  }
} else {
  console.log("Please pass in a file to read");
  process.exit();
}
console.log("This is the sychronous version");


const {createReadStream,createWriteStream,appendFile,writeFile} = require("fs")
const { Transform, Writable } = require("stream");
const upperCaseify = Transform();
const writeStream = Writable();

console.log('uppercaseify', upperCaseify._transform)

upperCaseify._transform = (buffer, _, callback) => {
  callback(null, buffer.toString().toUpperCase());
}

writeStream._write = (buffer, _, next) => {
  writeFile( "09_Caps.json", buffer, (err) => {
    if(err) throw err;
    console.log('The data to write was added to the file!');
  });
  next();
};

// Connect the streams to channel the data from read to transform to write
createReadStream(fileArg)
.pipe(upperCaseify)
.pipe(writeStream);