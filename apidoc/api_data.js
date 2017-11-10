define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/skills",
    "title": "Retrieve all skills",
    "version": "1.0.0",
    "name": "GetAll",
    "group": "Skills",
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n[\n {\n  \"skill\": {\n   \"id\": 1,\n   \"skill\": \"JavaScript programmer\",\n  }\n },\n {\n  \"skill\": {\n   \"id\": 2,\n   \"skill\": \"Java programmer\",\n  }\n },\n {\n  \"skill\": {\n   \"id\": 3,\n   \"skill\": \"C# programmer\",\n  }\n }\n]",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The skill id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "skill",
            "description": "<p>The name of a skill</p>"
          }
        ]
      }
    },
    "filename": "src/actions/v1/skills/list.mjs",
    "groupTitle": "Skills"
  },
  {
    "type": "post",
    "url": "/api/v1/users",
    "title": "Create an user",
    "version": "1.0.0",
    "name": "Create",
    "group": "Users",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of user</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of user</p>"
          },
          {
            "group": "Request body",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": "<p>Unique email of user</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "skills",
            "description": "<p>Array of user skills</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": false,
            "field": "skills.skill",
            "description": "<p>Skill object</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "skills.skill.id",
            "description": "<p>Id of skill</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "skills.skill.skill",
            "description": "<p>Name of skill</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"id\": \"123\",\n \"firstName\": \"John\",\n \"lastName\": \"Doe\",\n \"email\": \"john@doe.com\",\n \"skills\": [\n   {\n     \"skill\": {\n       \"id\": 1,\n       \"skill\": \"JavaScript programmer\",\n     }\n   },\n   {\n     \"skill\": {\n       \"id\": 2,\n       \"skill\": \"Java programmer\",\n     }\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 201 OK\n{\n \"id\": \"123\",\n \"firstName\": \"John\",\n \"lastName\": \"Doe\",\n \"email\": \"john@doe.com\",\n \"skills\": [\n   {\n     \"skill\": {\n       \"id\": 1,\n       \"skill\": \"JavaScript programmer\",\n     }\n   },\n   {\n     \"skill\": {\n       \"id\": 2,\n       \"skill\": \"Java programmer\",\n     }\n   }\n ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of user</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of user</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Unique email of user</p>"
          },
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "skills",
            "description": "<p>Array of user skills</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "skills.skill",
            "description": "<p>Skill object</p>"
          },
          {
            "group": "Success 201",
            "type": "Number",
            "optional": false,
            "field": "skills.skill.id",
            "description": "<p>Id of skill</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "skills.skill.skill",
            "description": "<p>Name of skill</p>"
          }
        ]
      }
    },
    "filename": "src/actions/v1/users/create.mjs",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Only valid data can be submit to the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Validation error response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"User email is not unique\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/users/:id",
    "title": "Delete an user",
    "version": "1.0.0",
    "name": "Delete",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The user id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "src/actions/v1/users/remove.mjs",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "User not found response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/users",
    "title": "Retrieve all users",
    "version": "1.0.0",
    "name": "GetAll",
    "group": "Users",
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n[\n {\n  \"id\": \"123\",\n  \"firstName\": \"John\",\n  \"lastName\": \"Doe\",\n  \"email\": \"john@doe.com\",\n  \"skills\": [\n   {\n    \"skill\": {\n     \"id\": 1,\n     \"skill\": \"JavaScript programmer\",\n    }\n   },\n   {\n    \"skill\": {\n     \"id\": 2,\n     \"skill\": \"Java programmer\",\n    }\n   }\n  ]\n },\n {\n  \"id\": \"111\",\n  \"firstName\": \"Alice\",\n  \"lastName\": \"Doe\",\n  \"email\": \"alice@doe.com\",\n  \"skills\": [\n   {\n    \"skill\": {\n     \"id\": 1,\n     \"skill\": \"JavaScript programmer\",\n    }\n   },\n   {\n    \"skill\": {\n     \"id\": 3,\n     \"skill\": \"C# programmer\",\n    }\n   }\n  ]\n }\n]",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Unique email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "skills",
            "description": "<p>Array of user skills</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "skills.skill",
            "description": "<p>Skill object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skills.skill.id",
            "description": "<p>Id of skill</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "skills.skill.skill",
            "description": "<p>Name of skill</p>"
          }
        ]
      }
    },
    "filename": "src/actions/v1/users/list.mjs",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:id",
    "title": "Retrieve an user",
    "version": "1.0.0",
    "name": "GetOne",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n{\n \"id\": \"123\",\n \"firstName\": \"John\",\n \"lastName\": \"Doe\",\n \"email\": \"john@doe.com\",\n \"skills\": [\n   {\n     \"skill\": {\n       \"id\": 1,\n       \"skill\": \"JavaScript programmer\",\n     }\n   },\n   {\n     \"skill\": {\n       \"id\": 2,\n       \"skill\": \"Java programmer\",\n     }\n   }\n ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Unique email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "skills",
            "description": "<p>Array of user skills</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "skills.skill",
            "description": "<p>Skill object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skills.skill.id",
            "description": "<p>Id of skill</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "skills.skill.skill",
            "description": "<p>Name of skill</p>"
          }
        ]
      }
    },
    "filename": "src/actions/v1/users/get.mjs",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "User not found response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/api/v1/users/:id",
    "title": "Update an user",
    "version": "1.0.0",
    "name": "Update",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The user id</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>First name of user</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>Last name of user</p>"
          },
          {
            "group": "Request body",
            "type": "Email",
            "optional": true,
            "field": "email",
            "description": "<p>Unique email of user</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": true,
            "field": "skills",
            "description": "<p>Array of user skills</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": false,
            "field": "skills.skill",
            "description": "<p>Skill object</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "skills.skill.id",
            "description": "<p>Id of skill</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "skills.skill.skill",
            "description": "<p>Name of skill</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"id\": \"123\",\n \"firstName\": \"Jack\",\n \"skills\": [\n   {\n     \"skill\": {\n       \"id\": 3,\n       \"skill\": \"C# programmer\",\n     }\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n{\n \"id\": \"123\",\n \"firstName\": \"Jack\",\n \"lastName\": \"Doe\",\n \"email\": \"john@doe.com\",\n \"skills\": [\n   {\n     \"skill\": {\n       \"id\": 3,\n       \"skill\": \"C# programmer\",\n     }\n   }\n ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Unique email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "skills",
            "description": "<p>Array of user skills</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "skills.skill",
            "description": "<p>Skill object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skills.skill.id",
            "description": "<p>Id of skill</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "skills.skill.skill",
            "description": "<p>Name of skill</p>"
          }
        ]
      }
    },
    "filename": "src/actions/v1/users/patch.mjs",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Only valid data can be submit to the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "User not found response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "Validation error response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"User email is not unique\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
