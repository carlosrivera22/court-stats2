import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { PlayerStatsService } from "./player-stats.service";
import { CreatePlayerStatsDto } from "./dto/create-player-stats.dto";

@Controller("player-stats")
export class PlayerStatsController {
  constructor(private readonly playerStatsService: PlayerStatsService) {}

  @Get("/player/:playerId")
  async getPlayerStats(@Param("playerId") playerId: number) {
    return await this.playerStatsService.findByPlayerId(playerId);
  }

  @Post("/player/:playerId")
  async createPlayerStats(@Body() CreatePlayerStatsDto: CreatePlayerStatsDto) {
    return await this.playerStatsService.create(CreatePlayerStatsDto);
  }
}
