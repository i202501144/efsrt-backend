import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WinnersService {
  constructor(private prisma: PrismaService) {}

  async getRecentWinners() {
    // Obtenemos ganadores de rifas
    const raffleWinners = await this.prisma.raffle.findMany({
      where: { status: 'DRAWN', winnerId: { not: null } },
      include: { winner: true },
      orderBy: { drawDate: 'desc' },
      take: 5,
    });

    // Obtenemos ganadores de minijuegos
    const gameWinners = await this.prisma.gameHistory.findMany({
      where: { isWin: true },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Combinamos y formateamos
    const combined = [
      ...raffleWinners.map((rw) => ({
        id: rw.id,
        name: rw.winner?.name || 'Usuario',
        prize: rw.prize,
        date: rw.drawDate,
        method: 'Rifa',
        rarity: 'Legendario',
        image: `https://i.pravatar.cc/150?u=${rw.winnerId}`,
      })),
      ...gameWinners.map((gw) => ({
        id: gw.id,
        name: gw.user?.name || gw.user?.email || 'Afortunado',
        prize: gw.prize || gw.result,
        date: gw.createdAt,
        method: gw.gameType,
        rarity: gw.gameType === 'SLOTS' ? 'Épico' : 'Raro',
        image: `https://i.pravatar.cc/150?u=${gw.userId}`,
      })),
    ];

    console.log(`[Winners] Total encontrados: ${combined.length}`);
    return combined.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }
}
