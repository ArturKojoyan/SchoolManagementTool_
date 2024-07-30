const teacherService = require("../services/teacher.service");

const teacherResolver = {
  Query: {
    getTeachers(_, _args, _context, info) {
      return teacherService.getTeachers(info);
    },
  },
  Mutation: {
    createTeacher(_, { input }) {
      return teacherService.createTeacher(input.name, input.surname);
    },
    updateTeacher(_, { input }) {
      return teacherService.updateTeacher(input.id, input.name, input.surname);
    },
    deleteTeacher(_, { input }) {
      return teacherService.deleteTeacher(input);
    },
  },
};

module.exports = teacherResolver;
