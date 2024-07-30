const pupilService = require("../services/pupil.service");

const pupilResolver = {
  Query: {
    getPupils(_, _args, _context, info) {
      return pupilService.getPupils(info);
    },
  },
  Mutation: {
    createPupil(_, { input }) {
      return pupilService.createPupil(input);
    },
    updatePupil(_, { input }) {
      return pupilService.updatePupil(input);
    },
    deleteSubject(_, { id }) {
      return pupilService.deletePupil(id);
    },
  },
};

module.exports = pupilResolver;
