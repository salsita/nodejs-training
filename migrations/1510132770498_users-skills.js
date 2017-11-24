exports.up = (pgm) => {
  pgm.createTable(
    'Skills',
    {
      skillId: { type: 'serial', primaryKey: true },
      skill: { type: 'varchar(1024)', notNull: true },
    }
  );
  pgm.createTable(
    'Users',
    {
      userId: { type: 'serial', primaryKey: true },
      firstName: { type: 'varchar(1024)', notNull: true },
      lastName: { type: 'varchar(1024)', notNull: true },
      email: { type: 'varchar(1024)', notNull: true },
    }
  );
  pgm.createIndex('Users', 'lower(email)', { unique: true, name: 'idx_user_email_uniq' });

  pgm.createTable(
    'UserSkills',
    {
      userSkillId: { type: 'serial', primaryKey: true },
      skillId: {
        type: 'integer',
        notNull: true,
        references: '"Skills"',
        onDelete: 'cascade',
      },
      userId: {
        type: 'integer',
        notNull: true,
        references: '"Users"',
        onDelete: 'cascade',
      },
    },
    {
      constraints: {
        unique: ['skillId', 'userId'],
      },
    }
  );

  pgm.createIndex('UserSkills', 'skillId', { name: 'idx_skills_skill' });
  pgm.createIndex('UserSkills', 'userId', { name: 'idx_skills_user' });
};
