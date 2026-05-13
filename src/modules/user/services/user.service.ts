import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async subscribe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Actualizamos al usuario como suscriptor
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { isSubscriber: true },
    });

    // Creamos un registro de suscripción simbólico
    await this.prisma.subscription.create({
      data: {
        userId: userId,
        status: 'ACTIVE',
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 mes de suscripción
      },
    });

    return {
      message: 'Suscripción exitosa',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        isSubscriber: updatedUser.isSubscriber,
      },
    };
  }

  async recordGameResult(userId: string, gameType: string, result: string, isWin: boolean, prize?: string) {
    console.log(`[Game] Guardando resultado para ${userId}: ${gameType} - Win: ${isWin} - Prize: ${prize}`);
    return this.prisma.gameHistory.create({
      data: {
        userId,
        gameType,
        result,
        isWin,
        prize,
      },
    });
  }
}
