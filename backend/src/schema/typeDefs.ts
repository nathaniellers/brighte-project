import { gql } from 'apollo-server';

export const typeDefs = gql`
  enum ServiceEnum {
    DELIVERY
    PICK_UP
    PAYMENT
  }

  type LeadService {
    id: Int!
    name: Service!
  }

  type Lead {
    id: String!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    createdAt: String!
    services: [LeadService!]!
  }

  enum Service {
    DELIVERY
    PICK_UP
    PAYMENT
  }

  type Query {
    leads: [Lead!]!
    lead(id: String!): Lead
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
