import { Injectable } from "@nestjs/common";
import db from "src/database";
export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  birthDate?: string;
  hometown?: string;
  age?: number;
}

@Injectable()
export class PlayersRepository {
  async findAll(): Promise<Player[]> {
    return db("players").select("*");
  }

  async findById(id: number): Promise<Player | undefined> {
    return db("players").where("id", id).first();
  }

  async create(playerData: Omit<Player, "id">): Promise<Player> {
    const [newPlayer] = await db("players").insert(playerData).returning("*"); // Make sure to use returning('*') to get the inserted player data back
    return newPlayer;
  }
}
