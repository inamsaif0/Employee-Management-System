import { ApolloServer } from '@apollo/server';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import connectDB from './config/database';
import typeDefs from './graphql/Schemas/schema';
import resolvers from './graphql/Resolvers/resolver';
import dotenv from 'dotenv';
import { authenticateToken } from './middlewares/auth-middleware';

dotenv.config();

const app = express();
export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
export const JWT_SECRET = process.env.JWT_SECRET

connectDB();

app.use(authenticateToken);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  '/graphql',
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }: { req: any }) => {
      const user = req.user;
      return { user };
    },
  })
);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server ready at http://localhost:${process.env.PORT || 4000}/graphql`);
});
