/* eslint-disable no-unused-expressions */
const chai = require("chai");
const supertest = require("supertest");

const getServer = require("../../test");
const { connect: connectDB, squel } = require("../../../db");

const { expect } = chai;

describe("/api/v1/users", () => {
  let server;
  let skills;
  let user;
  let newUserId;

  before(async () => {
    server = await getServer();

    const { body } = await supertest(server)
      .get("/api/v1/skills")
      .set("Accept", "application/json");
    skills = body;

    user = {
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      skills: [{ skill: skills[1] }],
    };

    await connectDB((dbClient) =>
      dbClient.query(squel.remove().from('"Users"').toParam())
    );
  });

  it("should create user", async () => {
    const { body: newUser } = await supertest(server)
      .post("/api/v1/users")
      .send(user)
      .set("Accept", "application/json")
      .expect(201);

    expect(newUser)
      .to.be.an("object")
      .with.keys("id", "firstName", "lastName", "email", "skills");
    newUserId = newUser.id;
  });

  it("should get users", async () => {
    const { body: users } = await supertest(server)
      .get("/api/v1/users")
      .set("Accept", "application/json")
      .expect(200);

    expect(users).to.be.an("array").that.is.not.empty;
    users.forEach((u) =>
      expect(u)
        .to.be.an("object")
        .with.keys("id", "firstName", "lastName", "email", "skills")
    );
  });

  it("should get user", async () => {
    const { body: getUser } = await supertest(server)
      .get(`/api/v1/users/${newUserId}`)
      .set("Accept", "application/json")
      .expect(200);

    expect(getUser)
      .to.be.an("object")
      .with.keys("id", "firstName", "lastName", "email", "skills");
    expect(getUser).to.eql({ ...user, id: newUserId });
  });

  it("should patch user", async () => {
    const newFirstName = "new first name";
    const newSkills = [{ skill: skills[2] }];
    const { body: patchedUser } = await supertest(server)
      .patch(`/api/v1/users/${newUserId}`)
      .send({
        firstName: newFirstName,
        skills: newSkills,
      })
      .set("Accept", "application/json")
      .expect(200);

    expect(patchedUser)
      .to.be.an("object")
      .with.keys("id", "firstName", "lastName", "email", "skills");
    expect(patchedUser.firstName).to.eql(newFirstName);
    expect(patchedUser.skills).to.eql(newSkills);
  });

  it("should remove user", async () => {
    const { body } = await supertest(server)
      .del(`/api/v1/users/${newUserId}`)
      .set("Accept", "application/json")
      .expect(204);

    expect(body).to.be.empty;
  });
});
