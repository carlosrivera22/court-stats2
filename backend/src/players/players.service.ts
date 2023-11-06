// players.service.ts
import { Injectable } from "@nestjs/common";
import { PlayersRepository, Player } from "./players.repository";
import db from "src/database";
import { PlayerStatsService } from "src/playerStats/player-stats.service";

@Injectable()
export class PlayersService {
  constructor(
    private readonly playersRepository: PlayersRepository,
    private readonly playerStatsService: PlayerStatsService, // Inject PlayerStatsService
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    searchTerm?: string,
    sortKey: "ppg" | "rpg" | "apg" = "ppg", // Default sort key
  ): Promise<{
    data: Player[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const offset = (page - 1) * limit;
    const data = await this.playersRepository.findAll(
      limit,
      offset,
      searchTerm,
    ); // Include searchTerm

    // Adjust the count query to include the search term
    let countQuery = db("players");
    if (searchTerm) {
      countQuery = countQuery
        .whereRaw('LOWER("firstName") LIKE ?', [searchTerm.toLowerCase()])
        .orWhereRaw('LOWER("lastName") LIKE ?', [searchTerm.toLowerCase()]);
    }

    const playersWithAverages = await Promise.all(
      data.map(async (player) => {
        const averages = await this.playerStatsService.findAveragesByPlayerId(
          player.id,
        );
        return { ...player, averages };
      }),
    );

    // Sort based on the selected sort key
    playersWithAverages.sort(
      (a, b) => b.averages[sortKey] - a.averages[sortKey],
    );

    // Apply pagination to the sorted array
    const paginatedPlayers = playersWithAverages.slice(offset, offset + limit);
    const total = (await countQuery.count("* as count").first())?.count || 0;

    const totalPages = Math.ceil(total / limit);

    return {
      data: paginatedPlayers,
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
    return this.playersRepository.update(id, playerData);
  }
}
export { Player };
