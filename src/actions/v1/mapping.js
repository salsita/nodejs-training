module.exports = {
  skillDbToApi: (doc) => ({
    id: doc.skillId,
    skill: doc.skill,
  }),

  skillApiToDB: (doc) => ({
    skillId: doc.id,
    skill: doc.skill,
  }),

  userDbToApi: (doc) => ({
    id: doc.userId,
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
  }),

  userApiToDB: (doc) => ({
    userId: doc.id,
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
  }),
};
