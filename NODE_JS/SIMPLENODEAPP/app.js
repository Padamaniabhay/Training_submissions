const http = require("http");

const httpRequestHandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.write(`<html><head></head><body><h1>HELLO WORLD!!!</h1></body></html>`);
  res.end();
};

const server = http.createServer(httpRequestHandler);

server.listen(3000, () => {
  console.log("server is up and runing");
});
