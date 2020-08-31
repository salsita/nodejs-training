// eslint-disable-next-line security/detect-child-process
const { spawn } = require("child_process");
const Page = require("./utils/page");
const baseUrl = require("../src/helpers/baseUrl");

let server;

// start api server before tests
before(async function before() {
  this.timeout(15000);

  server = spawn("node", ["./src"], {
    detached: true,
    stdio: "inherit",
  });

  // wait for server to start
  let loaded = false;
  while (!loaded) {
    /* eslint-disable no-await-in-loop */
    let page;
    try {
      page = await Page.build();
      await page.goto(baseUrl);
      loaded = true;
    } catch (err) {
      loaded = false;
    } finally {
      if (page) {
        await page.close();
      }
    }
    /* eslint-enable no-await-in-loop */
  }
});

// shutdown api server after all tests are run
after(() => {
  server.kill();
});
