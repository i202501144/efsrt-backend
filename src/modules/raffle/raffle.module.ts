import { Module } from '@nestjs/common';
import { RaffleService } from './services/raffle.service';
import { RaffleController } from './controllers/raffle.controller';

@Module({
  controllers: [RaffleController],
  providers: [RaffleService],
})
export class RaffleModule {}
