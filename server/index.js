const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/ErrorHandler");
const { resolvers, typeDefs } = require("./graphql");

const bootstrapServer = async () => {
  const server = new ApolloServer({ resolvers, typeDefs });
  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));

  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
  });
};

bootstrapServer();
