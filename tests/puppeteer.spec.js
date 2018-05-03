const { expect } = require("chai");
const Page = require("./utils/page");
const baseUrl = require("../src/helpers/baseUrl");

describe("puppeteer", function describePuppeteer() {
  let page;
  this.timeout(5000);

  beforeEach(async () => {
    page = await Page.build();
    await page.goto(`${baseUrl}/auth`);
  });

  afterEach(async () => {
    if (page) {
      await page.close();
    }
  });

  describe("not logged in", () => {
    it("should get error response on test API", async () => {
      const response = await page.get(`${baseUrl}/api/v1/auth/test`);
      expect(response).to.eql({ error: "Unauthorized" });
    });

    it("should display error response from test API", async () => {
      await page.waitFor(".test");
      const message = await page.getContentsOf(".test");
      expect(message).to.eql('{"error":"Unauthorized"}');
    });
  });

  describe("logged in", () => {
    let logout;

    beforeEach(async () => {
      logout = await page.login();
    });

    afterEach(async () => {
      await logout();
    });

    it("should get correct response on test API", async () => {
      const response = await page.get(`${baseUrl}/api/v1/auth/test`);
      expect(response).to.eql({ message: "ok" });
    });

    it("should display correct response from test API", async () => {
      await page.waitFor(".test");
      const message = await page.getContentsOf(".test");
      expect(message).to.eql('{"message":"ok"}');
    });
  });
});
