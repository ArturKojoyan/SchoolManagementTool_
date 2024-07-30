const subjectService = require("../services/subject.service");

const subjectResolver = {
  Query: {
    getSubjects(_, _args, _context, info) {
      return subjectService.getSubjects(info);
    },
  },
  Mutation: {
    createSubject(_, { input }) {
      return subjectService.createSubject(input);
    },
    updateSubject(_, { input }) {
      return subjectService.updateSubject(input);
    },
    deleteSubject(_, { input }) {
      return subjectService.deleteSubject(input);
    },
  },
};

module.exports = subjectResolver;
