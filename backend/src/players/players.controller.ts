import { Controller, Get } from "@nestjs/common";

@Controller("players")
export class PlayersController {
  @Get()
  sayHello(): string {
    return "Hello from NestJS!";
  }
}
