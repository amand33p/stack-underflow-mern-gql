const { ApolloServer } = require('apollo-server');
const connectToDB = require('./db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { PORT } = require('./utils/config');

connectToDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server readyys at ${url}`);
});
