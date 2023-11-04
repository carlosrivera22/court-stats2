import { Injectable } from "@nestjs/common";
import db from "src/database";
export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  birthDate?: string;
  homeTown?: string;
  age?: number;
}

@Injectable()
export class PlayersRepository {
  async findAll(options: { limit: number; offset: number }): Promise<Player[]> {
    return db("players")
      .select("*")
      .limit(options.limit)
      .offset(options.offset);
  }

  async findById(id: number): Promise<Player | undefined> {
    return db("players").where("id", id).first();
  }

  async create(playerData: Omit<Player, "id">): Promise<Player> {
    const [newPlayer] = await db("players").insert(playerData).returning("*"); // Make sure to use returning('*') to get the inserted player data back
    return newPlayer;
  }

  async update(id: number, playerData: Partial<Player>): Promise<Player> {
    const [updatedPlayer] = await db("players")
      .where("id", id)
      .update(playerData)
      .returning("*");
    return updatedPlayer;
  }
}
