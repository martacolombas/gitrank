import { gql } from 'apollo-server';

const typeDefs = gql`
type User {
  id: ID!
  }
`;

module.exports = typeDefs;
