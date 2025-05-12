import { prisma } from '../db';
import { z } from 'zod';

const LeadInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  mobile: z.string().regex(/^\d{11}$/, { message: "Mobile number must be 11 digits" }),
  postcode: z.string().length(4),
  services: z.array(z.enum(['DELIVERY', 'PICK_UP', 'PAYMENT']))
});

type LeadInputType = z.infer<typeof LeadInput>;

export const resolvers = {
  Query: {
    leads: async () =>
      await prisma.lead.findMany({
        include: {
          services: true,
        },
      }),
    lead: async (_: any, args: { id: string }) => {  // Change number to string
      return await prisma.lead.findUnique({
        where: { id: args.id }, // Ensure this uses a string ID
        include: {
          services: true,
        },
      });
    },
  },
  Mutation: {
    register: async (_: any, args: LeadInputType) => {
      const parsed = LeadInput.safeParse(args);
      if (!parsed.success) {
        throw new Error(parsed.error.errors.map((e) => e.message).join(', '));
      }

      const { name, email, mobile, postcode, services } = parsed.data;

      return await prisma.lead.create({
        data: {
          name,
          email,
          mobile,
          postcode,
          services: {
            create: services.map((service) => ({
              name: service,  // Pass `name` here (assuming the enum is the same as `name`)
            })),
          },
        },
        include: {
          services: true,
        },
      });  
    },
  },
};
