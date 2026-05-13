const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log('--- MODELS IN PRISMA CLIENT ---');
console.log('User model exists:', !!prisma.user);
console.log('Subscription model exists:', !!prisma.subscription);
console.log('GameHistory model exists:', !!prisma.gameHistory);
console.log('Raffle model exists:', !!prisma.raffle);

prisma.$disconnect();
