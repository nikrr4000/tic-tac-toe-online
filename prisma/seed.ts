import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    await prisma.game.create({
      data: {
        name: "game-1",
      },
    });

    await prisma.game.create({
      data: {
        name: "game-2",
      },
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
