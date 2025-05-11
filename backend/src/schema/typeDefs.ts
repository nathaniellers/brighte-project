import { gql } from 'apollo-server';

export const typeDefs = gql`
  enum ServiceEnum {
    DELIVERY
    PICK_UP
    PAYMENT
  }

  type Lead {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [ServiceEnum!]!
    createdAt: String!
  }

  type Query {
    leads: [Lead!]!
    lead(id: ID!): Lead
  }

  type Mutation {
    register(
      name: String!
      email: String!
      mobile: String!
      postcode: String!
      services: [ServiceEnum!]!
    ): Lead!
  }
`;
