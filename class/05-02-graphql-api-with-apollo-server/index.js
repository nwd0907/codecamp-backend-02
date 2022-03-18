import { ApolloServer, gql } from 'apollo-server';

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: Int
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 10,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(3001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} on port ${3001}`);
});