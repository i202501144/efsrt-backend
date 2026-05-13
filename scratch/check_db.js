const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const games = await prisma.gameHistory.findMany({
    include: { user: true }
  });
  console.log('--- GAME HISTORY ---');
  console.log(JSON.stringify(games, null, 2));
  
  const raffles = await prisma.raffle.findMany();
  console.log('--- RAFFLES ---');
  console.log(JSON.stringify(raffles, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
