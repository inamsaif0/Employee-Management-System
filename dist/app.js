import { ApolloServer } from '@apollo/server';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
// import connectDB from './config/database';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolver';
import { authenticateToken } from './middlewares/auth-middleware';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
// Connect to MongoDB
// connectDB();
// Middleware for Authentication
app.use((req, res, next) => {
    try {
        authenticateToken(req, res);
    }
    catch (error) {
        console.log('Authentication error:', error.message);
        next();
    }
});
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
server.start().then(() => {
    app.use('/graphql', bodyParser.json(), expressMiddleware(server));
    app.listen(process.env.PORT || 4000, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}/graphql`);
    });
});
