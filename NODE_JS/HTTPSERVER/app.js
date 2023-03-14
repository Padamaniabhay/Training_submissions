const http = require("http");

const httpRequestHandler = (req, res) => {
  if (req.url === "/") {
    res.writeHead(200);
    res.write(`hello world!!
    routes
         1)about 
         2)home`);
  } else if (req.url === "/about") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.write(JSON.stringify({ message: "response in json format" }));
  } else if (req.url === "/home") {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.write(`<html><body><h1>welcome to home page</h1></body></html>`);
  } else {
    res.writeHead(404);
    res.write("page not found");
  }
  res.end();
};

const server = http.createServer(httpRequestHandler);

server.listen(3000, () => {
  console.log("server is up and runing");
});
