const file = require("fs");
console.log("Hello");
//blocking operation ,Sync
const res = file.readFileSync("./test.txt", "utf-8");
console.log(res);
console.log("HEllO");