const chai = require('chai');
const sinon = require('sinon');

const toBoolean = require('./toBoolean');

const { expect } = chai;

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

  it('should not return default value', () => {
    const defaultValue = 'defaultValue';
    expect(toBoolean(undefined, defaultValue)).to.eql(defaultValue);
  });

  it('should convert 1 to true', () => {
    expect(toBoolean(1)).to.eql(true);
  });

  it('should convert 0 to false', () => {
    expect(toBoolean(0)).to.eql(false);
  });
});
