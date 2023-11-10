import { Injectable } from "@nestjs/common";
import { PlayerStatsRepository } from "./player-stats.repository";
import { CreatePlayerStatsDto } from "./dto/create-player-stats.dto";

@Injectable()
export class PlayerStatsService {
  constructor(private readonly playerStatsRepository: PlayerStatsRepository) {}

  async create(createPlayerStatsDto: CreatePlayerStatsDto) {
    return await this.playerStatsRepository.create(createPlayerStatsDto);
  }

  async findAll() {
    return await this.playerStatsRepository.findAll();
  }

  async findOne(id: number) {
    return await this.playerStatsRepository.findOne(id);
  }

  async findByPlayerId(playerId: number) {
    return await this.playerStatsRepository.findByPlayerId(playerId);
  }

  async findAveragesByPlayerId(playerId: number) {
    const playerStats = await this.findByPlayerId(playerId);

    if (playerStats.length === 0) {
      // Return null or appropriate default values if there are no stats
      return { ppg: 0, rpg: 0, apg: 0 };
    }

    const ppg = parseFloat(
      (
        playerStats.reduce((acc, cur) => acc + cur.points, 0) /
        playerStats.length
      ).toFixed(1),
    );
    const rpg = parseFloat(
      (
        playerStats.reduce((acc, cur) => acc + cur.rebounds, 0) /
        playerStats.length
      ).toFixed(1),
    );
    const apg = parseFloat(
      (
        playerStats.reduce((acc, cur) => acc + cur.assists, 0) /
        playerStats.length
      ).toFixed(1),
    );

    const averages = { ppg, rpg, apg };
    return averages;
  }

  async delete(id: number) {
    return await this.playerStatsRepository.delete(id);
  }
}
