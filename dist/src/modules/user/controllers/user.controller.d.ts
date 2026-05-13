import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    subscribe(id: string): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            isSubscriber: boolean;
        };
    }>;
    recordGame(body: any): Promise<{
        id: string;
        createdAt: Date;
        result: string;
        userId: string;
        gameType: string;
        isWin: boolean;
        prize: string | null;
    }>;
}
