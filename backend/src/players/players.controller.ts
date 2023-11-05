import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PlayersService } from "./players.service";
import { Player } from "./players.repository";

@Controller("players")
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get()
  getPlayers(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 6,
    @Query("searchTerm") searchTerm?: string, // New optional search query parameter
  ): Promise<{ data: Player[]; total: number; page: number; limit: number }> {
    limit = Math.min(100, limit); // Ensure limit is not greater than 100
    return this.playersService.findAll(page, limit, searchTerm); // Include searchTerm
  }

  @Get("/:id")
  getPlayer(@Param("id") id: number) {
    return this.playersService.findById(id);
  }

  @Post()
  createPlayer(@Body() playerData: Omit<Player, "id">) {
    return this.playersService.create(playerData);
  }

  @Put("/:id")
  updatePlayer(@Param("id") id: number, @Body() playerData: Partial<Player>) {
    return this.playersService.update(id, playerData);
  }
}
