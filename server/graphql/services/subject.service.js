const { PrismaClient } = require("@prisma/client");
const { selectionIsIncluded } = require("../utils");

const prisma = new PrismaClient();

class SubjectService {
  async createSubject({ name, grade, teacherId }) {
    const pupils = await prisma.pupil.findMany({
      where: { grade: Number(grade) },
    });
    const associatedPupilsIds = pupils.map((pupil) => ({
      id: pupil.id,
    }));

    const subject = await prisma.subject.create({
      data: {
        name,
        grade: Number(grade),
        teacherId: Number(teacherId),
        pupils: {
          connect: associatedPupilsIds,
        },
      },
    });

    return subject;
  }

  async getSubjects(info) {
    const subjects = await prisma.subject.findMany({
      include: {
        teacher: selectionIsIncluded("teacher", info),
        pupils: selectionIsIncluded("pupils", info),
      },
    });
    return subjects;
  }

  async updateSubject({ id, name, teacherId }) {
    const subject = await prisma.subject.update({
      where: { id: Number(id) },
      data: {
        name,
        teacherId: Number(teacherId),
      },
    });
    return subject;
  }

  async deleteSubject(id) {
    const subject = await prisma.subject.delete({ where: { id: Number(id) } });
    return subject;
  }
}

module.exports = new SubjectService();
