import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export function db(): PrismaClient {
  if (!prisma) {
    console.log('Creating new Prisma Client');
    prisma = new PrismaClient();
  }

  return prisma;
}
