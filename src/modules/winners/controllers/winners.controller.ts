import { Controller, Get } from '@nestjs/common';
import { WinnersService } from '../services/winners.service';

@Controller('winners')
export class WinnersController {
  constructor(private readonly winnersService: WinnersService) {}

  @Get()
  findAll() {
    return this.winnersService.getRecentWinners();
  }
}
