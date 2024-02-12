const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const pathName = req.url;
  const methodName = req.method;
  if (methodName === "POST" && pathName === "/user") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let userData = JSON.parse(body);
      fs.readFile(`${__dirname}/data.json`, "utf-8", (err, data) => {
        let usersData = [];
        if (!err) {
          usersData = JSON.parse(data);
        }

        usersData.push(userData);

        fs.writeFile(
          `${__dirname}/data.json`,
          JSON.stringify(usersData),
          "utf-8",
          (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Internal Server Error");
              return console.log("Error writing file!");
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("User data saved successfully");
          }
        );
      });
    });
  } else if (methodName === "GET" && pathName === "/users") {
    fs.readFile(`${__dirname}/data.json`, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return console.log("Error!");
      }
      const usersData = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(usersData));
    });
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<p>Page not found!</p>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
