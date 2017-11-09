import squel from '../squel';
import { onlyRows } from '../utils/wrap';
import quote from '../utils/quote';

export const findAll = onlyRows(
  dbClient => dbClient.query(
    squel
      .select()
      .from('"UserSkills"')
      .toParam()
  )
);

export const findSkillsForUser = onlyRows(
  (dbClient, id) => dbClient.query(
    squel
      .select()
      .field('s.*')
      .from('"UserSkills"', 'us')
      .join('"Skills"', 's', 'us."skillId" = s."skillId"')
      .where('us."userId" = ?', id)
      .toParam()
  )
);

export const insertForUser = onlyRows(
  (dbClient, userId, skillIds) =>
    (skillIds.length > 0
      ? dbClient.query(
        squel
          .insert()
          .into('"UserSkills"')
          .setFieldsRows(skillIds.map(
            skillId => quote({ userId, skillId })
          ))
          .returning('*')
          .toParam()
      )
      : {})
);

export const removeByIds = onlyRows(
  (dbClient, ids) =>
    (ids.length > 0
      ? dbClient.query(
        squel
          .remove()
          .from('"UserSkills"')
          .where('"userSkillId" IN ?', ids)
          .returning('*')
          .toParam()
      )
      : {})
);
