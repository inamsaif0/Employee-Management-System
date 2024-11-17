import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]
    attendance: [String!]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
}

  type Query {
    listEmployees(filter: String, sortBy: String, order: String, limit: Int, offset: Int): [Employee!]
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    # Employee mutations
    addEmployee(name: String!, age: Int!, class: String!, subjects: [String!]!, attendance: [String!]!): Employee
    updateEmployee(
      id: ID!,
      name: String,
      age: Int,
      class: String,
      subjects: [String!],
      attendance: [String!]
    ): Employee

    # Authentication mutations
    register(username: String!, email: String!, password: String!, role: String!): User!
    login(email: String!, password: String!): AuthResponse!
  }

  type AuthResponse {
    token: String!
    user: User!
  }
`;

export default typeDefs;
