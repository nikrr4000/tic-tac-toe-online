import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    const user = await prisma.user.create({
      data:{
        login: 'user1',
        passwordHash: '322323',
        rating: 1000
      }
    })

    await prisma.game.create({
      data: {
        field: Array(9).fill(null),
        status: "idle",
        players: {
          connect: {
            id: user.id
          }
        }
      },
    });

    await prisma.game.create({
      data: {
        field: Array(9).fill(null),
        status: "idle",
        players: {
          connect: {
            id: user.id
          }
        }
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
