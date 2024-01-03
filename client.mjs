import http from "node:http";

const sendRequest = () =>
  http
    .request({ host: "www.google.com" }, (res) => {
      let str = "";

      res.on("data", (data) => {
        str += data;
      });

      res.on("end", () => {
        console.log(str);
      });
    })
    .end();

for (let i = 0; i < 1; i++) {
  sendRequest();
}
