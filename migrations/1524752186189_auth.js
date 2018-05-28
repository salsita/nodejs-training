exports.up = pgm => {
  pgm.addColumns("Users", {
    googleIdentifier: { type: "varchar(1024)" },
    githubIdentifier: { type: "varchar(1024)" },
    login: { type: "varchar(1024)" },
    password: { type: "varchar(1024)" },
    salt: { type: "varchar(1024)" },
    configVersion: { type: "varchar(1024)" }
  });
  pgm.createIndex("Users", "googleIdentifier", {
    unique: true,
    name: "idx_user_google_uniq"
  });

  pgm.createIndex("Users", "githubIdentifier", {
    unique: true,
    name: "idx_user_github_uniq"
  });

  pgm.createIndex("Users", "login", {
    unique: true,
    name: "idx_user_login_uniq"
  });
};
