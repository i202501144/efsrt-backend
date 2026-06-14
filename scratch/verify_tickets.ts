import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/modules/user/services/user.service';
import { PrismaService } from '../src/modules/prisma/prisma.service';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);
  const prisma = app.get(PrismaService);

  console.log('--- STARTING TICKET INTEGRATION END-TO-END TEST ---');

  // 1. Get or create a user
  let user = await prisma.user.findFirst();
  if (!user) {
    console.log('Creating a test user...');
    user = await prisma.user.create({
      data: {
        email: 'testticket@luckywave.com',
        password: 'securepassword123',
        name: 'Test Ticket User',
      },
    });
  }
  console.log(`Using test user: ${user.name} (${user.id})`);

  // 2. Get or create an open raffle
  let raffle = await prisma.raffle.findFirst({
    where: { status: 'OPEN' }
  });
  if (!raffle) {
    console.log('No open raffle found. Creating one...');
    raffle = await prisma.raffle.create({
      data: {
        title: 'Smart TV 55" Premium',
        prize: 'Smart TV 55"',
        status: 'OPEN',
        drawDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      },
    });
  }
  console.log(`Using open raffle: ${raffle.title} (${raffle.id})`);

  // 3. Purchase a ticket
  console.log('Step 1: Purchasing a ticket via buyTicket...');
  const ticket = await userService.buyTicket(user.id, raffle.id);
  console.log(`Success: Generated ticket #${ticket.number} (ID: ${ticket.id})`);

  if (!ticket || !ticket.number) {
    throw new Error('Ticket number was not correctly generated.');
  }

  // 4. Retrieve user tickets
  console.log('Step 2: Retrieving user tickets...');
  const userTickets = await userService.getUserTickets(user.id);
  console.log(`Success: Retrieved ${userTickets.length} tickets for user.`);

  const found = userTickets.some(t => t.id === ticket.id);
  if (!found) {
    throw new Error('Newly created ticket was not found in the user tickets list.');
  }

  console.log('--- ALL TICKET INTEGRATION TESTS PASSED SUCCESSFULLY ---');
  await app.close();
}

main().catch((err) => {
  console.error('TICKET TEST FAILED:', err);
  process.exit(1);
});
