import { RaffleService } from '../services/raffle.service';
import { CreateRaffleDto } from '../dto/create-raffle.dto';
export declare class RaffleController {
    private readonly raffleService;
    constructor(raffleService: RaffleService);
    findAll(): Promise<({
        _count: {
            tickets: number;
        };
    } & {
        id: string;
        createdAt: Date;
        status: string;
        prize: string;
        title: string;
        description: string | null;
        drawDate: Date;
        winnerId: string | null;
    })[]>;
    create(createRaffleDto: CreateRaffleDto): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        prize: string;
        title: string;
        description: string | null;
        drawDate: Date;
        winnerId: string | null;
    }>;
    findOne(id: string): Promise<({
        tickets: ({
            user: {
                email: string;
                password: string;
                name: string | null;
                id: string;
                isSubscriber: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            number: number;
            id: string;
            createdAt: Date;
            userId: string;
            raffleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        status: string;
        prize: string;
        title: string;
        description: string | null;
        drawDate: Date;
        winnerId: string | null;
    }) | null>;
}
