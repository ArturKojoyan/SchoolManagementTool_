const { sign } = require("jsonwebtoken");

const generateJwt = (id, username, role) =>
  sign({ id, username, role }, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });

module.exports = { generateJwt };
