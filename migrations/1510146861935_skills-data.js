const squel = require('squel');

const psqlSquel = squel.useFlavour('postgres');

exports.up = (pgm) => {
  pgm.sql(
    psqlSquel
      .insert()
      .into('"Skills"')
      .setFieldsRows([
        { skill: "JavaScript Developer" },
        { skill: "Java Developer" },
        { skill: "C# Developer" },
      ])
      .toString()
  );
};

exports.down = (pgm) => {
  pgm.sql(
    psqlSquel
      .delete()
      .from('"Skills"')
      .toString()
  );
};
