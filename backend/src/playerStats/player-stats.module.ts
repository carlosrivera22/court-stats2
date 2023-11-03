import { Module } from "@nestjs/common";
import { PlayerStatsController } from "./player-stats.controller";
import { PlayerStatsService } from "./player-stats.service";
import { PlayerStatsRepository } from "./player-stats.repository";

@Module({
  controllers: [PlayerStatsController],
  providers: [PlayerStatsService, PlayerStatsRepository],
})
export class PlayerStatsModule {}
