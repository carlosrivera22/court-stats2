import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { PlayersService } from "./players.service";
import { Player } from "./players.repository";

@Controller("players")
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get()
  getPlayers() {
    return this.playersService.findAll();
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
