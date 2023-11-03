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

  // Additional methods for update, delete, etc.
}
