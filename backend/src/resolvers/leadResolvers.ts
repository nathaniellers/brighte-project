import { prisma } from '../db';

export const resolvers = {
  Query: {
    leads: async () => await prisma.lead.findMany(),
    lead: async (_: any, args: { id: number }) =>
      await prisma.lead.findUnique({ where: { id: args.id } }),
  },
  Mutation: {
    register: async (_: any, args: any) => {
      const { name, email, mobile, postcode, services } = args;
      return await prisma.lead.create({
        data: {
          name,
          email,
          mobile,
          postcode,
          services,
        },
      });
    },
  },
};
