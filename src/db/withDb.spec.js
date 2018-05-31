/* eslint-disable no-unused-expressions */
const chai = require("chai");
const sinon = require("sinon");
const pg = require("pg");

const withDb = require("./withDb");

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("wrap", () => {
  afterEach(() => {
    sandbox.restore();
  });

  it("should call fn with non changed args when dbClient is first argument", async () => {
    const fn = sinon.spy();
    const client = new pg.Client();
    const args = [1, 2, 3];
    await withDb(fn)(client, ...args);
    expect(fn).to.have.been.called;
    expect(fn).to.have.been.calledWith(client, ...args);
  });

  it("should call fn with created dbClient when dbClient is not first argument", async () => {
    const fn = sinon.spy();
    const args = [1, 2, 3];
    await withDb(fn)(...args);
    expect(fn).to.have.been.called;
    expect(fn.getCall(0).args[0]).to.be.an.instanceof(pg.Client);
    args.forEach((arg, i) => expect(fn.getCall(0).args[i + 1]).to.eql(arg));
    expect(fn.getCall(0).args[args.length + 2]).to.eql(undefined);
  });
});
