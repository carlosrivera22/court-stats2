import { Module } from "@nestjs/common";
import { PlayerStatsService } from "src/playerStats/player-stats.service";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";
import { PlayersRepository } from "./players.repository";
import { PlayerStatsRepository } from "src/playerStats/player-stats.repository";

@Module({
  controllers: [PlayersController],
  providers: [
    PlayersService,
    PlayerStatsService,
    PlayersRepository,
    PlayerStatsRepository,
  ],
})
export class PlayersModule {}
