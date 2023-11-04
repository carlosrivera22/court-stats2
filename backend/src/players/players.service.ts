// players.service.ts
import { Injectable } from "@nestjs/common";
import { PlayersRepository, Player } from "./players.repository";
import db from "src/database";

@Injectable()
export class PlayersService {
  constructor(private playersRepository: PlayersRepository) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Player[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const offset = (page - 1) * limit;
    const data = await this.playersRepository.findAll(limit, offset);

    // Assuming `count` returns an object with a single property `count` that is the total number of players
    const total = (await db("players").count("* as count").first())?.count || 0;
    const totalPages = Math.ceil(total / limit); // Calculate total pages

    return {
      data: data,
      total: total,
      totalPages: totalPages,
      page,
      limit,
    };
  }

  async findById(id: number): Promise<Player | undefined> {
    return this.playersRepository.findById(id);
  }

  async create(playerData: Omit<Player, "id">): Promise<Player> {
    return this.playersRepository.create(playerData);
  }

  async update(id: number, playerData: Partial<Player>): Promise<Player> {
    if (playerData.birthDate) {
      playerData.age =
        new Date().getFullYear() - new Date(playerData.birthDate).getFullYear();
    }
    return this.playersRepository.update(id, playerData);
  }
}
export { Player };
