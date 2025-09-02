const player1 = {
  name: "Mario",
  speed: 4,
  maneuverability: 0,
  power: 3,
  points: 0,
};
const player2 = {
  name: "Luigi",
  speed: 3,
  maneuverability: 4,
  power: 4,
  points: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;
  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
      break;
  }
  return result;
}

(async function main() {
  for (let round = 1; round <= 5; round++) {
    console.log("rodada " + round);

    let block = await getRandomBlock();
    await playRaceEngine(player1, player2);
  }
})();

async function playRaceEngine(character1, character2) {}
