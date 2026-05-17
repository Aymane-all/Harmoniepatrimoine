import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("=== SERVICES ===");
  const services = await prisma.service.findMany({
    select: {
      id_service: true,
      nom_service: true,
      slug: true,
    }
  });
  console.log(JSON.stringify(services, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  , 2));

  console.log("\n=== SIMULATEURS ===");
  const simulateurs = await prisma.simulateur.findMany({
    select: {
      id_simulateur: true,
      titre: true,
      slug: true,
    }
  });
  console.log(JSON.stringify(simulateurs, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  , 2));
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
