const { PrismaClient } = require("@prisma/client");
const { selectionIsIncluded } = require("../utils");

const prisma = new PrismaClient();

class PupilService {
  async createPupil({ name, grade }) {
    const subjects = await prisma.subject.findMany({
      where: { grade: Number(grade) },
    });
    const associatedSubjectsIds = subjects.map((subject) => ({
      id: subject.id,
    }));

    const newPupil = await prisma.pupil.create({
      data: {
        name,
        grade: Number(grade),
        subjects: {
          connect: associatedSubjectsIds,
        },
      },
    });

    return newPupil;
  }

  async getPupils(info) {
    const pupils = await prisma.pupil.findMany({
      include: { subjects: selectionIsIncluded("subjects", info) },
    });
    return pupils;
  }

  async updatePupil({ id, name }) {
    const pupil = await prisma.pupil.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });
    return pupil;
  }

  async deletePupil(id) {
    const teacher = await prisma.teacher.delete({ where: id });
    return teacher;
  }
}

module.exports = new PupilService();
