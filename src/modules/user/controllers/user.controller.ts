import { Controller, Post, Param, UseGuards, Request, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('subscribe/:id')
  subscribe(@Param('id') id: string) {
    return this.userService.subscribe(id);
  }

  @Post('game-result')
  recordGame(@Body() body: any) {
    const { userId, gameType, result, isWin, prize } = body;
    return this.userService.recordGameResult(userId, gameType, result, isWin, prize);
  }
}
