export const skillDbToApi = doc => ({
  id: doc.skillId,
  skill: doc.skill,
});

export const skillApiToDB = doc => ({
  skillId: doc.id,
  skill: doc.skill,
});

export const userDbToApi = doc => ({
  id: doc.userId,
  firstName: doc.firstName,
  lastName: doc.lastName,
  email: doc.email,
});

export const userApiToDB = doc => ({
  userId: doc.id,
  firstName: doc.firstName,
  lastName: doc.lastName,
  email: doc.email,
});
