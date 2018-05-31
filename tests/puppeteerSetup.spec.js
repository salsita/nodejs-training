// eslint-disable-next-line security/detect-child-process
const { spawn } = require("child_process");

let server;

// start api server before tests
before(done => {
  server = spawn("node", ["./src"], {
    detached: true,
    stdio: "ignore"
  });
  setTimeout(done, 1000); // wait for server to start
});

// shutdown api server after all tests are run
after(() => {
  server.kill();
});
