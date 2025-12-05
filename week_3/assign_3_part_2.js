const fs = require("fs");
const path = require("path");
const http = require("http");

const port = 3000;
const usrPath = path.resolve('./users.json')
let users = [];

try {
    users = JSON.parse(fs.readFileSync(usrPath, "utf-8"));
} catch (error) {
    users = [];

};

function saveUsers() {
    fs.writeFileSync(usrPath, JSON.stringify(users));
}
const server = http.createServer((req, res) => {

    const item = req.url.split('/');
    if (item[1] === "signup" && req.method === "POST") {
        let data = ""
        req.on("data", (chunk) => {

            data += chunk.toString();
        });
        req.on("end", () => {
            let parsedData = JSON.parse(data);

            const {
                id,
                user_name,
                email,
                pass,
                age
            } = parsedData;

            const checkUser = users.find((usr) => {
                return usr.email === email;
            });

            if (!checkUser) {
                users.push({
                    id,
                    user_name,
                    email,
                    pass,
                    age
                });
                saveUsers();
                res.writeHead(200, {
                    "content-type": "application/json"
                });
                res.end(JSON.stringify("user Added ✅"));

            } else {
                res.writeHead(409, {
                    "content-type": "application/json"
                });
                res.end(JSON.stringify("user already exist 🫣"));
            }

        })
    } else if (item[1] === "user" && req.method === "GET") {

        const id = item[2];

        if (!id) {
            res.writeHead(400, {
                "content-type": "application/json"
            });
            return res.end(JSON.stringify({
                error: "Missing user id"
            }));
        }

        const user = users.find(u => u.id == id);

        if (!user) {

            return res.end(JSON.stringify({
                error: "User not found"
            }));
        }

        res.end(JSON.stringify(user));
    } else if (item[1] === "user" && req.method === "PATCH") {

        const id = item[2];

        if (!id) {
            res.writeHead(400, {
                "content-type": "application/json"
            });
            return res.end(JSON.stringify({
                error: "Missing user id"
            }));
        }

        let body = "";
        req.on("data", chunk => body += chunk.toString());

        req.on("end", () => {
            let parsed;
            try {
                parsed = JSON.parse(body);
            } catch {
                res.writeHead(400, {
                    "content-type": "application/json"
                });
                return res.end(JSON.stringify({
                    error: "Invalid JSON format"
                }));
            }

            const {
                user_name,
                email,
                pass,
                age
            } = parsed;

            const user = users.find(u => u.id == id);
            if (!user) {
                res.writeHead(404, {
                    "content-type": "application/json"
                });
                return res.end(JSON.stringify({
                    error: "User not found"
                }));
            }

            const allowed = ["user_name", "email", "pass", "age"];

            for (const key of allowed) {
                if (parsed[key] !== undefined) {
                    user[key] = parsed[key];
                }
            }
            saveUsers();

            res.writeHead(200, {
                "content-type": "application/json"
            });
            return res.end(JSON.stringify({
                message: "User patched",
                user
            }));
        });
    } 
    
    else if (item[1] === "user" && req.method === "DELETE") {

        const id = item[2];

        if (!id) {
            res.writeHead(400, {
                "content-type": "application/json"
            });
            return res.end(JSON.stringify({
                error: "Missing user id"
            }));
        }

        const index = users.findIndex(u => u.id == id);

        if (index === -1) {
            res.writeHead(404, {
                "content-type": "application/json"
            });
            return res.end(JSON.stringify({
                error: "User not found"
            }));
        }

        users.splice(index, 1);
        saveUsers();

        res.writeHead(200, {
            "content-type": "application/json"
        });
        return res.end(JSON.stringify({
            message: "User deleted successfully"
        }));
    }




});

server.listen(port, () => {
    console.log("zy_alfol");
})
server.on("error", (err) => {
    console.log(err);
});




//essay
/*
1. What is the Node.js Event Loop?
The Event Loop is a mechanism in Node.js that allows non-blocking I/O operations.
It continuously checks the call stack and event queue, executing callbacks when operations are complete.

2. What is Libuv and What Role Does It Play in Node.js?
Libuv is a C library Node.js uses to handle asynchronous I/O operations.
It provides the event loop, thread pool, and cross-platform I/O support for Node.js.

3. How Does Node.js Handle Asynchronous Operations Under the Hood?
Node.js offloads I/O operations to the system kernel or the thread pool (via Libuv).
When the operation completes, the callback is added to the event queue and executed by the event loop.

4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js?

Call Stack: Where functions are executed in order.

Event Queue: Stores callbacks from completed asynchronous operations.

Event Loop: Continuously checks the call stack and event queue, moving callbacks to the stack when it’s empty.

5. What is the Node.js Thread Pool and How to Set the Thread Pool Size?
The thread pool is a set of worker threads used for asynchronous operations that can’t be done by the kernel 


6. How Does Node.js Handle Blocking and Non-Blocking Code Execution?

Blocking code runs on the main thread and stops other operations until it finishes.

Non-blocking code uses asynchronous APIs, 
allowing Node.js to continue executing other code while waiting for I/O operations.

*/