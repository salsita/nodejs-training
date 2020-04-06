const joi = require("@hapi/joi");
const joiMiddleware = require("@salsita/koa-joi-middleware");
const { userApiToDB, userDbToApi, skillDbToApi } = require("../mapping");
const { patch } = require("../../../services/users");
const { userSkillsModel } = require("../../../db");
const { userSchema, userId } = require("../../../validations/user");

/**
 * @api {patch} /api/v1/users/:id Update an user
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup Users
 *
 * @apiParam {String} id The user id
 *
 * @apiParam (Request body) {String} [firstName] First name of user
 * @apiParam (Request body) {String} [lastName] Last name of user
 * @apiParam (Request body) {Email} [email] Unique email of user
 * @apiParam (Request body) {Array} [skills] Array of user skills
 * @apiParam (Request body) {Object} skills.skill Skill object
 * @apiParam (Request body) {Number} skills.skill.id Id of skill
 * @apiParam (Request body) {String} skills.skill.skill Name of skill
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "id": "123",
 *      "firstName": "Jack",
 *      "skills": [
 *        {
 *          "skill": {
 *            "id": 3,
 *            "skill": "C# programmer",
 *          }
 *        }
 *      ]
 *     }
 *
 * @apiUse UserResult200
 *
 * @apiSuccessExample {json} Success response:
 *     HTTP/1.1 200 OK
 *     {
 *      "id": "123",
 *      "firstName": "Jack",
 *      "lastName": "Doe",
 *      "email": "john@doe.com",
 *      "skills": [
 *        {
 *          "skill": {
 *            "id": 3,
 *            "skill": "C# programmer",
 *          }
 *        }
 *      ]
 *     }
 *
 * @apiUse UserNotFoundError
 * @apiUse ClientError
 */
module.exports = [
  joiMiddleware([
    {
      get: (ctx) => ctx.params,
      schema: joi.object().keys({
        id: userId.required(),
      }),
    },
    {
      get: (ctx) => ctx.request.body,
      schema: userSchema
        .fork(["id"], (schema) => schema.forbidden())
        .required(),
    },
  ]),

  async (ctx) => {
    const {
      params: { id },
      request: { body },
    } = ctx;

    const user = userApiToDB(body);
    const skillIds = body.skills && body.skills.map((skill) => skill.skill.id);

    const { user: updatedUser } = await patch(id, user, skillIds);

    const updatedSkills = await userSkillsModel.findSkillsForUser(id);

    ctx.body = {
      ...userDbToApi(updatedUser),
      skills: updatedSkills.map((skill) => ({ skill: skillDbToApi(skill) })),
    };
  },
];
