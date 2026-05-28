const fs = require("fs");
const os = require("os");
console.log(os.cpus().length);
//non blocking Operation, Async
console.log(fs.readFile("./test.txt", "utf-8", (err, res) => {
    if (res) {
        console.log(res);

    }
    else {
        console.log("ERROR");
    }
}));
console.log("HEllo HELLO hEllo");