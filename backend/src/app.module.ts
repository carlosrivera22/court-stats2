import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PlayersController } from "./players/players.controller";
import { PlayersService } from "./players/players.service";
import { PlayersRepository } from "./players/players.repository";

@Module({
  imports: [],
  controllers: [AppController, PlayersController],
  providers: [AppService, PlayersService, PlayersRepository],
})
export class AppModule {}
