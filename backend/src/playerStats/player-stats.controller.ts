import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
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
  async createPlayerStats(
    @Param("playerId") playerId: number,
    @Body() createPlayerStatsDto: CreatePlayerStatsDto,
  ) {
    const data = { ...createPlayerStatsDto, playerId };
    return await this.playerStatsService.create(data);
  }

  @Get("/player/:playerId/averages")
  async getPlayerStatsAverages(@Param("playerId") playerId: number) {
    return await this.playerStatsService.findAveragesByPlayerId(playerId);
  }

  @Delete("/:id")
  async deletePlayerStats(@Param("id") id: number) {
    console.debug("called");
    return await this.playerStatsService.delete(id);
  }
}
