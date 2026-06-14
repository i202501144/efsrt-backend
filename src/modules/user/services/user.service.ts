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

  async recordGameResult(
    userId: string,
    gameType: string,
    result: string,
    isWin: boolean,
    prize?: string,
  ) {
    console.log(
      `[Game] Guardando resultado para ${userId}: ${gameType} - Win: ${isWin} - Prize: ${prize}`,
    );
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

  async buyTicket(userId: string, raffleId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const raffle = await this.prisma.raffle.findUnique({
      where: { id: raffleId },
    });
    if (!raffle) {
      throw new NotFoundException('Rifa no encontrada');
    }

    // Generar un número de ticket aleatorio único de 5 dígitos (10000 - 99999)
    let ticketNumber = 0;
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      ticketNumber = Math.floor(10000 + Math.random() * 90000);
      const existing = await this.prisma.ticket.findFirst({
        where: { raffleId, number: ticketNumber },
      });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      const count = await this.prisma.ticket.count({ where: { raffleId } });
      ticketNumber = 10000 + count + 1;
    }

    return this.prisma.ticket.create({
      data: {
        userId,
        raffleId,
        number: ticketNumber,
      },
      include: {
        raffle: true,
      },
    });
  }

  async getUserTickets(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.prisma.ticket.findMany({
      where: { userId },
      include: {
        raffle: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
