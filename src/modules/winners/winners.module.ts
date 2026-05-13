import { Module } from '@nestjs/common';
import { WinnersService } from './services/winners.service';
import { WinnersController } from './controllers/winners.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WinnersController],
  providers: [WinnersService, PrismaService],
})
export class WinnersModule {}
