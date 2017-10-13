const expect = require('chai').expect;
const sinon = require('sinon');

import toBoolean from './toBoolean';

describe('toBoolean', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should not change undefined', () => {
    expect(toBoolean(undefined)).to.eql(undefined);
  });
});
