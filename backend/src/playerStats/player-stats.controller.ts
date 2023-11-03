import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { PlayerStatsService } from "./player-stats.service";
import { CreatePlayerStatsDto } from "./dto/create-player-stats.dto";

@Controller("player-stats")
export class PlayerStatsController {
  constructor(private readonly playerStatsService: PlayerStatsService) {}

  @Post()
  async createStats(@Body() createStatsDto: CreatePlayerStatsDto) {
    return await this.playerStatsService.create(createStatsDto);
  }

  @Get("/player/:playerId")
  async getPlayerStats(@Param("playerId") playerId: number) {
    return await this.playerStatsService.findByPlayerId(playerId);
  }

  // Additional CRUD endpoints as necessary
}
