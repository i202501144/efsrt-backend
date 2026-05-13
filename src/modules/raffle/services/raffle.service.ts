import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRaffleDto } from '../dto/create-raffle.dto';

@Injectable()
export class RaffleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.raffle.findMany({
      include: {
        _count: {
          select: { tickets: true },
        },
      },
    });
  }

  async create(data: CreateRaffleDto) {
    return this.prisma.raffle.create({
      data: {
        title: data.title,
        description: data.description,
        prize: data.prize,
        status: 'OPEN',
        drawDate: new Date(data.drawDate),
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.raffle.findUnique({
      where: { id },
      include: {
        tickets: {
          include: { user: true },
        },
      },
    });
  }
}
