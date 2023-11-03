import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Player, PlayersService } from "./players.service";

@Controller("players")
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get()
  getPlayers() {
    return this.playersService.findAll();
  }

  @Get("/:id")
  getPlayer(@Param("id") id: string) {
    return this.playersService.findById(id);
  }

  @Post()
  createPlayer(@Body() playerData: Omit<Player, "id">) {
    return this.playersService.create(playerData);
  }
}
