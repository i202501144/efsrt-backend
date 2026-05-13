const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Buscar el primer usuario
  const user = await prisma.user.findFirst();
  
  if (!user) {
    console.log('No hay usuarios en la BD. Crea uno primero.');
    return;
  }

  console.log('Creando ganador de prueba para:', user.email);

  const game = await prisma.gameHistory.create({
    data: {
      userId: user.id,
      gameType: 'SLOTS',
      result: 'Jackpot',
      isWin: true,
      prize: 'iPhone 15 Pro',
    }
  });

  console.log('Ganador creado:', game);
}

main().catch(console.error).finally(() => prisma.$disconnect());
