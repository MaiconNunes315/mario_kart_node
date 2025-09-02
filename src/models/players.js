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

}
