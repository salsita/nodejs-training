const puppeteer = require("puppeteer");
const isWsl = require("is-wsl");
const { createUser, removeUser } = require("./user");
const createStoreAuthTokenCode = require("../../src/helpers/createStoreAuthTokenCode");
const { createSessionToken } = require("../../src/auth/utils");
const baseUrl = require("../../src/helpers/baseUrl");

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      // args: isWsl ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
      executablePath: isWsl
        ? "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
        : undefined,
      headless: true // switching to false is slower, but better for debugging
    });
    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    page.on("console", ({ _text }) =>
      // eslint-disable-next-line no-console
      console.log.apply(console, ["[Browser]", _text])
    );

    return new Proxy([customPage, browser, page], {
      get: function get(targets, property) {
        // eslint-disable-next-line no-restricted-syntax
        for (const target of targets) {
          if (target[property] !== undefined) {
            return target[property].bind(target);
          }
        }
        return undefined;
      }
    });
  }

  constructor(page) {
    this.page = page;
    this.token = null;
  }

  getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }

  async login() {
    const user = await createUser();
    const token = await createSessionToken(user);

    await this.page.evaluate(storeAuthTokenCode => {
      // eslint-disable-next-line no-eval,security/detect-eval-with-expression
      eval(storeAuthTokenCode);
    }, createStoreAuthTokenCode(token));

    await this.page.goto(`${baseUrl}/auth`);

    this.token = token;

    return () => removeUser(user);
  }

  get(path) {
    return this.request("GET", path);
  }

  post(path, data) {
    return this.request("POST", path, data);
  }

  request(method, path, data) {
    return this.page.evaluate(
      (_method, _path, _data, _token) =>
        // eslint-disable-next-line no-undef
        fetch(_path, {
          method: _method,
          headers: {
            "Content-Type": "application/json",
            Authorization: _token ? `Bearer ${_token}` : undefined
          },
          body: _data ? JSON.stringify(_data) : undefined
        }).then(res => res.json()),
      method,
      path,
      data,
      this.token
    );
  }
}

module.exports = CustomPage;
