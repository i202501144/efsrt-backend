import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RaffleModule } from './modules/raffle/raffle.module';
import { WinnersModule } from './modules/winners/winners.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, RaffleModule, WinnersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
