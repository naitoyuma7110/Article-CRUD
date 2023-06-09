import { PrismaClient } from '@prisma/client';
import { articles } from './data/articles';

const prisma = new PrismaClient();

async function main() {
  return await prisma.$transaction(async (prisma) => {
    await prisma.article.deleteMany();
    await prisma.article.createMany({
      data: articles,
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
