const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { generateJwt } = require("../../utils");

const prisma = new PrismaClient();

class UserService {
  async getAllUsers() {
    return await prisma.user.findMany();
  }
  async getUser(username) {
    return await prisma.user.findFirst({ where: { username } });
  }

  async register({ username, password, role }) {
    const hashPassword = await bcrypt.hash(password, 6);
    const user = await prisma.user.create({
      data: {
        password: hashPassword,
        username,
        role,
      },
    });
    if (!user) {
      throw new Error("internal server error");
    }

    const token = generateJwt(user.id, username, role);
    return { token };
  }

  async login({ username, password }) {
    const user = await prisma.user.findFirst({
      where: { username },
    });
    if (!user) {
      throw new Error("user with inputted username does not exist");
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new Error("password is not correct");
    }

    const token = generateJwt(user.id, user.username, user.role);
    return { token };
  }
}

module.exports = new UserService();
