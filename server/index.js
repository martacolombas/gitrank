import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';

const server = new ApolloServer({ typeDefs })