const employeesData = require("./employees");

module.exports = () => ({
  employees: employeesData,
});

// db.json
// localhost /posts, etc:
// {
//   "posts": [
//     { "id": 1, "title": "json-server", "author": "typicode" }
//   ],
//   "comments": [
//     { "id": 1, "body": "some comment", "postId": 1 }
//   ],
//   "profile": { "name": "typicode" }
// }
