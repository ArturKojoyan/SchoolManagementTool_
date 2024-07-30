const { PrismaClient } = require("@prisma/client");
const { selectionIsIncluded } = require("../utils");

const prisma = new PrismaClient();

class TeacherService {
  async createTeacher(name, surname) {
    try {
      const newTeacher = await prisma.teacher.create({
        data: {
          name,
          surname,
        },
      });

      return newTeacher;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getTeachers(info) {
    try {
      const teachers = await prisma.teacher.findMany({
        include: { subjects: selectionIsIncluded("subjects", info) },
      });
      return teachers;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateTeacher(id, name, surname) {
    try {
      const teacher = await prisma.teacher.update({
        where: { id: Number(id) },
        data: {
          name,
          surname,
        },
      });
      return teacher;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteTeacher(id) {
    try {
      const teacher = await prisma.teacher.delete({
        where: { id: Number(id) },
      });
      return teacher;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new TeacherService();
