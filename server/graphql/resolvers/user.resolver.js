const userService = require("../services/user.service");

const userResolver = {
  Query: {
    getAllUsers() {
      return userService.getAllUsers();
    },
    getUser(_, { username }) {
      return userService.getUser(username);
    },
  },
  Mutation: {
    register(_, { input }) {
      return userService.register(input);
    },
    login(_, { input }) {
      return userService.login(input);
    },
  },
};

module.exports = userResolver;
