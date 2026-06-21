import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalAsPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalAsPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    }),
  });

if (process.env.NODE_ENV !== "production") {
    globalAsPrisma.prisma = prisma;
}

export default prisma;