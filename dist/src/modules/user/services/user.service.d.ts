import { PrismaService } from '../../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    subscribe(userId: string): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            isSubscriber: boolean;
        };
    }>;
    recordGameResult(userId: string, gameType: string, result: string, isWin: boolean, prize?: string): Promise<{
        id: string;
        createdAt: Date;
        result: string;
        userId: string;
        gameType: string;
        isWin: boolean;
        prize: string | null;
    }>;
}
