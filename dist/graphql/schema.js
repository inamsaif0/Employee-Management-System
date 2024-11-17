import { gql } from 'graphql-tag';
const typeDefs = gql `
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: [String!]!
  }

  type Query {
    listEmployees(filter: String, sortBy: String, order: String, limit: Int, offset: Int): [Employee!]
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, age: Int!, class: String!, subjects: [String!]!, attendance: [String!]!): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String!], attendance: [String!]): Employee
}
`;
export default typeDefs;
