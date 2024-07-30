const usersResolver = require("./resolvers/user.resolver");
const teacherResolver = require("./resolvers/teacher.resolver");

const { readFileSync } = require("fs");
const path = require("path");
const subjectResolver = require("./resolvers/subject.resolver");
const pupilResolver = require("./resolvers/pupil.resolver");

const userTypes = readFileSync(
  path.join(__dirname, "./typeDefs/user.graphql"),
  {
    encoding: "utf-8",
  }
);
const teacherTypes = readFileSync(
  path.join(__dirname, "./typeDefs/teacher.graphql")
);
const subjectTypes = readFileSync(
  path.join(__dirname, "./typeDefs/subject.graphql")
);
const pupilTypes = readFileSync(
  path.join(__dirname, "./typeDefs/pupil.graphql")
);

const typeDefs = `
  ${userTypes}
  ${teacherTypes}
  ${subjectTypes}
  ${pupilTypes}
  `;

const resolvers = {
  Query: {
    ...usersResolver.Query,
    ...teacherResolver.Query,
    ...subjectResolver.Query,
    ...pupilResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...teacherResolver.Mutation,
    ...subjectResolver.Mutation,
    ...pupilResolver.Mutation,
  },
};

module.exports = { typeDefs, resolvers };
