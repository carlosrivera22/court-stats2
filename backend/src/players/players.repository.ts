import { Injectable } from "@nestjs/common";
import db from "src/database";
export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  birthDate?: string;
  homeTown?: string;
  age?: number;
  profilePictureUrl?: string;
}

@Injectable()
export class PlayersRepository {
  async findAll(
    limit: number,
    offset: number,
    searchTerm?: string,
  ): Promise<Player[]> {
    let query = db("players").select("*");

    if (searchTerm) {
      const lowerCaseSearchTerm = `%${searchTerm.toLowerCase()}%`;
      query = query
        .whereRaw('LOWER("firstName") LIKE ?', [lowerCaseSearchTerm])
        .orWhereRaw('LOWER("lastName") LIKE ?', [lowerCaseSearchTerm]);
    }

    // Add an orderBy clause to sort by firstName
    query = query.orderBy("createdAt", "desc"); // 'asc' for ascending, 'desc' for descending

    return query.limit(limit).offset(offset);
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
