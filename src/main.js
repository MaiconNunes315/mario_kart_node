import { Players } from "./models/players.js";
import { FetchService } from "./services/fetch-service.js";
import { Readline } from "./services/readline.js";
import { Users } from "./models/users.js";

class Main {
  constructor() {
    this.service = new FetchService()
    this.usersModel = new Users();
    this.rl = new Readline()
    this.start();
  }

  async start() {
    this.rl.start();
    // const users = await this.service.get('users', { active: 'S' });
    // console.log(users);
    // // if (!users.length) {
    // const model = this.usersModel.model();
    // console.log('Nenhum usuário ativo encontrado. Por favor, crie um usuário antes de continuar.');
    // console.log('Responda as seguintes perguntas para novo usuário');
    // const name = await this.rl.createQuestion('Qual seu nome ?');
    // const age = await this.rl.createQuestion('Qual sua idade ?');
    // model.name = name;
    // model.age = age;
    // model.active = 'S';
    // const user = await this.usersModel.createUser(model);
    // console.log(user);
    // // await this.service.set('users', { name, age, active: 'S' });
    // // if (name && age) {
    // this.rl.close();
    // }
    // }
    // const name = await readline.createQuestion('Digite o nome do jogador: ');
    // const player = new Players(name);
    // await this.service.post('players', player);
    // console.log('este é seu nome ? ' + name)
    // const get = await this.service.get('players');
  }
}

new Main();


// async function rollDice() {
//   return Math.floor(Math.random() * 6) + 1;
// }

// async function getRandomBlock() {
//   let random = Math.random();
//   let result;

//   switch (true) {
//     case random < 0.33:
//       result = "RETA";
//       break;
//     case random < 0.66:
//       result = "CURVA";
//       break;
//     default:
//       result = "CONFRONTO";
//   }

//   return result;
// }

// async function logRollResult(characterName, block, diceResult, attribute) {
//   console.log(
//     `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute
//     }`
//   );
// }

// async function playRaceEngine(character1, character2) {
//   for (let round = 1; round <= 5; round++) {
//     console.log(`🏁 Rodada ${round}`);

//     // sortear bloco
//     let block = await getRandomBlock();
//     console.log(`Bloco: ${block}`);

//     // rolar os dados
//     let diceResult1 = await rollDice();
//     let diceResult2 = await rollDice();

//     //teste de habilidade
//     let totalTestSkill1 = 0;
//     let totalTestSkill2 = 0;

//     if (block === "RETA") {
//       totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
//       totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

//       await logRollResult(
//         character1.NOME,
//         "velocidade",
//         diceResult1,
//         character1.VELOCIDADE
//       );

//       await logRollResult(
//         character2.NOME,
//         "velocidade",
//         diceResult2,
//         character2.VELOCIDADE
//       );
//     }

//     if (block === "CURVA") {
//       totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
//       totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

//       await logRollResult(
//         character1.NOME,
//         "manobrabilidade",
//         diceResult1,
//         character1.MANOBRABILIDADE
//       );

//       await logRollResult(
//         character2.NOME,
//         "manobrabilidade",
//         diceResult2,
//         character2.MANOBRABILIDADE
//       );
//     }

//     if (block === "CONFRONTO") {
//       let powerResult1 = diceResult1 + character1.PODER;
//       let powerResult2 = diceResult2 + character2.PODER;

//       console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

//       await logRollResult(
//         character1.NOME,
//         "poder",
//         diceResult1,
//         character1.PODER
//       );

//       await logRollResult(
//         character2.NOME,
//         "poder",
//         diceResult2,
//         character2.PODER
//       );

//       if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
//         console.log(
//           `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
//         );
//         character2.PONTOS--;
//       }

//       if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
//         console.log(
//           `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
//         );
//         character1.PONTOS--;
//       }

//       console.log(
//         powerResult2 === powerResult1
//           ? "Confronto empatado! Nenhum ponto foi perdido"
//           : ""
//       );
//     }

//     // verificando o vencedor
//     if (totalTestSkill1 > totalTestSkill2) {
//       console.log(`${character1.NOME} marcou um ponto!`);
//       character1.PONTOS++;
//     } else if (totalTestSkill2 > totalTestSkill1) {
//       console.log(`${character2.NOME} marcou um ponto!`);
//       character2.PONTOS++;
//     }

//     console.log("-----------------------------");
//   }
// }

// async function declareWinner(character1, character2) {
//   console.log("Resultado final:");
//   console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
//   console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

//   if (character1.PONTOS > character2.PONTOS)
//     console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
//   else if (character2.PONTOS > character1.PONTOS)
//     console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
//   else console.log("A corrida terminou em empate");
// }

// (async function main() {
//   console.log(
//     `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
//   );

//   await playRaceEngine(player1, player2);
//   await declareWinner(player1, player2);
// })();