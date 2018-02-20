/* eslint-disable no-unused-expressions */
const chai = require('chai');
const supertest = require('supertest');

const web = require('../../test');

const { expect } = chai;

describe('/api/v1/skills', () => {
  let server;

  before(async () => {
    server = (await web).server; // eslint-disable-line prefer-destructuring
  });

  it('should get skills', async () => {
    const { body: skills } = await supertest(server)
      .get('/api/v1/skills')
      .set('Accept', 'application/json')
      .expect(200);

    expect(skills).to.be.an('array').that.is.not.empty;
    skills.forEach(skill =>
      expect(skill).to.be.an('object').with.keys('id', 'skill'));
  });
});

