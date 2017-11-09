/* eslint-disable no-unused-expressions */
import chai from 'chai';
import sinon from 'sinon';
import pg from 'pg';

import withDb from './withDb';

const { expect } = chai;

describe('wrap', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call fn with non changed args when dbClient is first argument', async () => {
    const fn = sinon.spy();
    const client = new pg.Client();
    const args = [1, 2, 3];
    await withDb(fn)(client, ...args);
    expect(fn).to.have.been.called;
    expect(fn).to.have.been.calledWith(client, ...args);
  });

  it('should call fn with created dbClient when dbClient is not first argument', async () => {
    const fn = sinon.spy();
    const args = [1, 2, 3];
    await withDb(fn)(...args);
    expect(fn).to.have.been.called;
    expect(fn.getCall(0).args[0]).to.be.an.instanceof(pg.Client);
    args.forEach((arg, i) => expect(fn.getCall(0).args[i + 1]).to.eql(arg));
    expect(fn.getCall(0).args[args.length + 2]).to.eql(undefined);
  });
});
