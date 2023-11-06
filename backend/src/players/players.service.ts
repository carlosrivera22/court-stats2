// players.service.ts
import { Injectable } from "@nestjs/common";
import { PlayersRepository, Player } from "./players.repository";
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
    sortKey: "ppg" | "rpg" | "apg" = "ppg",
  ): Promise<{
    data: Player[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  }> {
    // Get the unpaginated list of players matching the search term.
    const allMatchingPlayers = await this.playersRepository.findAll(
      undefined,
      undefined,
      searchTerm,
    );
    // Get averages for each player and attach them to the player object.
    const playersWithAverages = await Promise.all(
      allMatchingPlayers.map(async (player) => {
        const averages = await this.playerStatsService.findAveragesByPlayerId(
          player.id,
        );
        return { ...player, averages };
      }),
    );

    // Sort the players with averages based on the sort key.
    playersWithAverages.sort(
      (a, b) => b.averages[sortKey] - a.averages[sortKey],
    );

    // Calculate the total number of players (for pagination).
    const total = playersWithAverages.length;
    const totalPages = Math.ceil(total / limit);

    // Apply pagination by slicing the sorted list.
    const paginatedPlayers = playersWithAverages.slice(
      (page - 1) * limit,
      page * limit,
    );

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
