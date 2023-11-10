import { Injectable } from "@nestjs/common";
import { CreatePlayerStatsDto } from "./dto/create-player-stats.dto";
import db from "src/database";

@Injectable()
export class PlayerStatsRepository {
  async create(createPlayerStatsDto: CreatePlayerStatsDto) {
    return await db("playerStats").insert(createPlayerStatsDto);
  }

  async findAll() {
    return await db.select("*").from("playerStats");
  }

  async findOne(id: number) {
    return await db.select("*").from("playerStats").where("id", id).first();
  }

  async findByPlayerId(playerId: number) {
    return await db.select("*").from("playerStats").where("playerId", playerId);
  }

  async delete(id: number) {
    return await db("playerStats").where("id", id).del();
  }
}
