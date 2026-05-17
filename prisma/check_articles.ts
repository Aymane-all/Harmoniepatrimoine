import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const articles = await prisma.article.findMany({
    select: { id_article: true, titre: true, actif: true, image_url: true },
  });
  console.log(JSON.stringify(articles, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2));
}

main().finally(() => prisma.$disconnect());
