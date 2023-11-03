import { Injectable } from "@nestjs/common";

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  hometown: string;
  age: number;
};

@Injectable()
export class PlayersService {
  private players: Player[] = [
    // This would typically come from a database
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      birthDate: "1995-01-15",
      hometown: "Los Angeles",
      age: 28,
    },
  ];

  findAll(): Player[] {
    return this.players;
  }

  findById(id: string): Player | undefined {
    return this.players.find((player) => player.id === id);
  }

  create(playerData: Omit<Player, "id">): Player {
    const newPlayer: Player = {
      id: this.generateId(),
      ...playerData,
    };
    this.players.push(newPlayer);
    return newPlayer;
  }

  private generateId(): string {
    // A simple method to generate a unique ID for each player
    return (this.players.length + 1).toString();
  }
}
