/**
 * @apiDefine UserNotFoundError
 * @apiVersion 1.0.0
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample {json} User not found response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 */

/**
 * @apiDefine UserResult201
 *
 * @apiSuccess (Success 201) {Number} id The user id
 * @apiSuccess (Success 201) {String} firstName First name of user
 * @apiSuccess (Success 201) {String} lastName Last name of user
 * @apiSuccess (Success 201) {String} email Unique email of user
 * @apiSuccess (Success 201) {Array} skills Array of user skills
 * @apiSuccess (Success 201) {Object} skills.skill Skill object
 * @apiSuccess (Success 201) {Number} skills.skill.id Id of skill
 * @apiSuccess (Success 201) {String} skills.skill.skill Name of skill
 */

/**
 * @apiDefine UserResult200
 *
 * @apiSuccess (Success 200) {Number} id The user id
 * @apiSuccess (Success 200) {String} firstName First name of user
 * @apiSuccess (Success 200) {String} lastName Last name of user
 * @apiSuccess (Success 200) {String} email Unique email of user
 * @apiSuccess (Success 200) {Array} skills Array of user skills
 * @apiSuccess (Success 200) {Object} skills.skill Skill object
 * @apiSuccess (Success 200) {Number} skills.skill.id Id of skill
 * @apiSuccess (Success 200) {String} skills.skill.skill Name of skill
 */
