// players.service.ts
import { Injectable } from "@nestjs/common";
import { PlayersRepository, Player } from "./players.repository";

@Injectable()
export class PlayersService {
  constructor(private playersRepository: PlayersRepository) {}

  async findAll(page: number = 1, limit: number = 10): Promise<Player[]> {
    const offset = (page - 1) * limit;
    const data = await this.playersRepository.findAll({ limit, offset });

    return data;
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
