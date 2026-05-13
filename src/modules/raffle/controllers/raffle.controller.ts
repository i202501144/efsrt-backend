import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RaffleService } from '../services/raffle.service';
import { CreateRaffleDto } from '../dto/create-raffle.dto';

@Controller('raffles')
export class RaffleController {
  constructor(private readonly raffleService: RaffleService) {}

  @Get()
  findAll() {
    return this.raffleService.findAll();
  }

  @Post()
  create(@Body() createRaffleDto: CreateRaffleDto) {
    return this.raffleService.create(createRaffleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raffleService.findOne(id);
  }
}
