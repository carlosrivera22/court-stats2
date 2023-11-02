import { Controller, Get, Param } from "@nestjs/common";

@Controller("players")
export class PlayersController {
  @Get()
  getPlayers(): string {
    return JSON.stringify([
      {
        id: `Player 1`,
        firstName: "John",
        lastName: "Doe",
        ppg: 24.1,
        apg: 6.3,
        rpg: 5.5,
        birthDate: "1995-01-15",
        hometown: "Los Angeles",
        age: 28,
      },
    ]);
  }

  @Get("/:id")
  getPlayer(@Param("id") id: string): string {
    return JSON.stringify({
      id: `Player ${id}`,
      firstName: "John",
      lastName: "Doe",
      ppg: 24.1,
      apg: 6.3,
      rpg: 5.5,
      birthDate: "1995-01-15",
      hometown: "Los Angeles",
      age: 28,
    });
  }
}
