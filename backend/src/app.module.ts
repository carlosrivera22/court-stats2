import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PlayerStatsModule } from "./playerStats/player-stats.module";
import { PlayersModule } from "./players/players.module";

@Module({
  imports: [PlayerStatsModule, PlayersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
