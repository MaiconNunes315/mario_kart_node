import { FetchService } from "../services/fetch-service.js";

export class Players {
  constructor(name, speed, maneuverability, power, points) {
    this.name = name;
    this.speed = speed;
    this.maneuverability = maneuverability;
    this.power = power;
    this.points = points;
  }

  getInfo() {
    return `Jogador: ${this.name}, Velocidade: ${this.speed}`;
  }

  async getPlayers(formatted = true) {
    const req = new FetchService();
    const players = await req.get('players');
    if (!formatted) return players;
    const newPlayers = players.map(p => p.id + ' - ' + p.name);
    return newPlayers;
  }

  async getPlayerById(id) {
    const req = new FetchService();
    const player = await req.get(`players/${id}`);
    return player;
  }

}
