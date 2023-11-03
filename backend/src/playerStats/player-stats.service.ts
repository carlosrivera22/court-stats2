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
    console.debug("playerStats", playerStats);

    if (playerStats.length === 0) {
      // Return null or appropriate default values if there are no stats
      return { ppg: 0, rpg: 0, apg: 0 };
    }

    const ppg =
      playerStats.reduce((acc, cur) => acc + cur.points, 0) /
      playerStats.length;
    const rpg =
      playerStats.reduce((acc, cur) => acc + cur.rebounds, 0) /
      playerStats.length;
    const apg =
      playerStats.reduce((acc, cur) => acc + cur.assists, 0) /
      playerStats.length;

    const averages = { ppg, rpg, apg };
    return averages;
  }
}