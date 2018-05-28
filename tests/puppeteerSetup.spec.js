const { spawn } = require("child_process");

let server;

before(done => {
  server = spawn("node", ["./src"], {
    detached: true,
    stdio: "ignore"
  });
  setTimeout(done, 1000); // wait for server to start
});

after(() => {
  server.kill();
});
