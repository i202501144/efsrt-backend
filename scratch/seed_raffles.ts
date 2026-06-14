import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING PRODUCT RAFFLES (RAFFLEPASS) ---');

  const now = new Date();

  const rafflesData = [
    {
      title: 'iPhone 15 Pro Max Titanium',
      prize: 'iPhone 15 Pro Max',
      description: 'Experimenta la última tecnología de Apple con el chasis de titanio y la cámara de 5x zoom óptico.',
      drawDate: new Date(new Date().setDate(now.getDate() + 25)),
    },
    {
      title: 'MacBook Pro M3 Max Pro',
      prize: 'MacBook Pro M3',
      description: 'La laptop definitiva para desarrolladores, diseñadores y creadores de contenido profesionales.',
      drawDate: new Date(new Date().setDate(now.getDate() + 30)),
    },
    {
      title: 'PlayStation 5 Console Edition',
      prize: 'PlayStation 5',
      description: 'Disfruta de tiempos de carga mínimos, gatillos adaptativos y un catálogo de juegos inigualable.',
      drawDate: new Date(new Date().setDate(now.getDate() + 15)),
    },
    {
      title: 'Refrigeradora LG Side by Side',
      prize: 'Refrigeradora LG',
      description: 'Refrigeradora inteligente con dispensador de agua, filtro de aire y conectividad WiFi SmartThinQ.',
      drawDate: new Date(new Date().setDate(now.getDate() + 20)),
    },
    {
      title: 'Lavadora Inteligente Samsung',
      prize: 'Lavadora Samsung',
      description: 'Lavadora con panel de control AI Control y tecnología EcoBubble para un lavado eficiente y cuidadoso.',
      drawDate: new Date(new Date().setDate(now.getDate() + 10)),
    },
  ];

  for (const item of rafflesData) {
    // Verificar si ya existe una con el mismo título
    const existing = await prisma.raffle.findFirst({
      where: { title: item.title }
    });

    if (!existing) {
      const created = await prisma.raffle.create({
        data: {
          title: item.title,
          prize: item.prize,
          description: item.description,
          status: 'OPEN',
          drawDate: item.drawDate,
        }
      });
      console.log(`Created raffle: ${created.title} (ID: ${created.id})`);
    } else {
      console.log(`Raffle already exists: ${item.title}`);
    }
  }

  console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
}

main()
  .catch(console.error)
  .finally(() => {
    void prisma.$disconnect();
  });
