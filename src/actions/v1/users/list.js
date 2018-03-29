const _ = require("lodash");
const { skillDbToApi, userDbToApi } = require("../mapping");
const { usersModel, skillsModel, userSkillsModel } = require("../../../db");

/**
 * @api {get} /api/v1/users Retrieve all users
 * @apiVersion 1.0.0
 * @apiName GetAll
 * @apiGroup Users
 *
 * @apiUse UserResult200
 *
 * @apiSuccessExample {json} Success response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *       "id": "123",
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "email": "john@doe.com",
 *       "skills": [
 *        {
 *         "skill": {
 *          "id": 1,
 *          "skill": "JavaScript programmer",
 *         }
 *        },
 *        {
 *         "skill": {
 *          "id": 2,
 *          "skill": "Java programmer",
 *         }
 *        }
 *       ]
 *      },
 *      {
 *       "id": "111",
 *       "firstName": "Alice",
 *       "lastName": "Doe",
 *       "email": "alice@doe.com",
 *       "skills": [
 *        {
 *         "skill": {
 *          "id": 1,
 *          "skill": "JavaScript programmer",
 *         }
 *        },
 *        {
 *         "skill": {
 *          "id": 3,
 *          "skill": "C# programmer",
 *         }
 *        }
 *       ]
 *      }
 *     ]
 */
module.exports = [
  async ctx => {
    const users = await usersModel.findAll();
    const skills = _.keyBy(
      (await skillsModel.findAll()).map(skillDbToApi),
      "id"
    );
    const skillsByUser = _.chain(await userSkillsModel.findAll())
      .groupBy("userId")
      .mapValues(userSkills =>
        userSkills.map(({ skillId }) => ({ skill: skills[skillId] }))
      )
      .value();

    ctx.body = users.map(user => ({
      ...userDbToApi(user),
      skills: skillsByUser[user.userId] || []
    }));
  }
];
