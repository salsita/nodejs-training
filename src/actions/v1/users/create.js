const HTTPStatus = require("http-status");
const joiMiddleware = require("@salsita/koa-joi-middleware");
const { userApiToDB, userDbToApi, skillDbToApi } = require("../mapping");
const { create } = require("../../../services/users");
const { userSkillsModel } = require("../../../db");
const { userSchemaRequired } = require("../../../validations/user");

/**
 * @api {post} /api/v1/users Create an user
 * @apiVersion 1.0.0
 * @apiName Create
 * @apiGroup Users
 *
 * @apiParam (Request body) {String} firstName First name of user
 * @apiParam (Request body) {String} lastName Last name of user
 * @apiParam (Request body) {Email} email Unique email of user
 * @apiParam (Request body) {Array} skills Array of user skills
 * @apiParam (Request body) {Object} skills.skill Skill object
 * @apiParam (Request body) {Number} skills.skill.id Id of skill
 * @apiParam (Request body) {String} skills.skill.skill Name of skill
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "firstName": "John",
 *      "lastName": "Doe",
 *      "email": "john@doe.com",
 *      "skills": [
 *        {
 *          "skill": {
 *            "id": 1,
 *            "skill": "JavaScript programmer",
 *          }
 *        },
 *        {
 *          "skill": {
 *            "id": 2,
 *            "skill": "Java programmer",
 *          }
 *        }
 *      ]
 *     }
 *
 * @apiUse UserResult201
 *
 * @apiSuccessExample {json} Success response:
 *     HTTP/1.1 201 OK
 *     {
 *      "id": "123",
 *      "firstName": "John",
 *      "lastName": "Doe",
 *      "email": "john@doe.com",
 *      "skills": [
 *        {
 *          "skill": {
 *            "id": 1,
 *            "skill": "JavaScript programmer",
 *          }
 *        },
 *        {
 *          "skill": {
 *            "id": 2,
 *            "skill": "Java programmer",
 *          }
 *        }
 *      ]
 *     }
 *
 * @apiUse ClientError
 */
module.exports = [
  joiMiddleware([
    {
      get: (ctx) => ctx.request.body,
      schema: userSchemaRequired
        .fork(["id"], (schema) => schema.forbidden())
        .required(),
    },
  ]),

  async (ctx) => {
    const { body } = ctx.request;
    const user = userApiToDB(body);
    const skills = body.skills || [];
    const skillIds = skills.map((skill) => skill.skill.id);

    const { user: createdUser } = await create(user, skillIds);

    const createdSkills = await userSkillsModel.findSkillsForUser(
      createdUser.userId
    );

    ctx.status = HTTPStatus.CREATED;
    ctx.body = {
      ...userDbToApi(createdUser),
      skills: createdSkills.map((skill) => ({ skill: skillDbToApi(skill) })),
    };
  },
];
