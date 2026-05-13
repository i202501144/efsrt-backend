import { PrismaService } from '../../prisma/prisma.service';
export declare class WinnersService {
    private prisma;
    constructor(prisma: PrismaService);
    getRecentWinners(): Promise<{
        id: string;
        name: string;
        prize: string;
        date: Date;
        method: string;
        rarity: string;
        image: string;
    }[]>;
}
