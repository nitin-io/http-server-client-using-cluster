import cpus from "node:os";
import cluster from "node:cluster";
import http from "node:http";

const numCPUs = cpus.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      console.log(
        `worker with pid ${worker.process.pid} died with code ${code}, give signal ${signal}`
      );
    });
  }
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.write(`<h1>Process ID: ${process.pid}</h1>`);
      res.end();
    })
    .listen(8080, () =>
      console.log(`running on port 8080, process id: ${process.pid}`)
    );
}
