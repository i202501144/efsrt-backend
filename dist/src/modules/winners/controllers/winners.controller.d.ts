import { WinnersService } from '../services/winners.service';
export declare class WinnersController {
    private readonly winnersService;
    constructor(winnersService: WinnersService);
    findAll(): Promise<{
        id: string;
        name: string;
        prize: string;
        date: Date;
        method: string;
        rarity: string;
        image: string;
    }[]>;
}
