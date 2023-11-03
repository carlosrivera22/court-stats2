// players.service.ts
import { Injectable } from "@nestjs/common";
import { PlayersRepository, Player } from "./players.repository";

@Injectable()
export class PlayersService {
  constructor(private playersRepository: PlayersRepository) {}

  async findAll(): Promise<Player[]> {
    return this.playersRepository.findAll();
  }

  async findById(id: number): Promise<Player | undefined> {
    return this.playersRepository.findById(id);
  }

  async create(playerData: Omit<Player, "id">): Promise<Player> {
    return this.playersRepository.create(playerData);
  }

  // Add additional service methods as needed
}
export { Player };
