import { Players } from "../models/players.js";
import { Users } from "../models/users.js";
import { Readline } from "./readline.js";

export class GameService {
    constructor(selected) {
        this.selected = selected.toLowerCase();
        this.rl = new Readline();
        this.players = new Players();
        this.points = { player1: 0, player2: 0 };
    }

    // async getSelected() {
    //     const selected = this.selected;
    //     let users = new Users();
    //     const res = await users.getUsers();

    //     switch (selected) {
    //         case 'jogar':
    //             this.play();
    //             break;
    //         case 'ranking':
    //             this.getRanking();
    //             break;
    //         case 'estatisticas':
    //             this.getStatistics();
    //             break;
    //         case 'usuários':
    //             console.log('Buscando usuários...');
    //             await this.getUsers();
    //             break;
    //         case 'sair':
    //             console.log('Saindo do jogo...');
    //             process.exit(0);
    //         case 'voltar':
    //             const options = this.rl.options;
    //             console.log(options);
    //             return;
    //             if (options === 1) {
    //                 this.getUsers();
    //                 return;
    //             }

    //             this.setNewMenu(['Jogar', 'Estatísticas', 'Usuários', 'Sair']);
    //             break;
    //         case 'selecionar usuário':
    //             break;
    //         case 'criar usuário':
    //             console.log('Criar Usuário...');
    //             const users = new Users();
    //             const model = users.model();
    //             console.log('Responda as seguintes perguntas para novo usuário');
    //             const name = await this.rl.createQuestion('Qual seu name ? ');
    //             const age = await this.rl.createQuestion('Qual sua idade ? ');
    //             model.name = name;
    //             model.age = age;
    //             model.active = 'S';
    //             const user = await users.createUser(model);
    //             console.log(user);
    //             break;
    //         case 'ver usuário selecionado':
    //             const map = res.map(user => `Cod. ${user.id} - name: ${user.name} ${user.active === 'S' ? '✔️' : ''}`);
    //             console.log(map.join('\n'));
    //             console.log("")
    //             this.rl.setOption(['Voltar']);
    //             await this.rl.start(false);
    //             break;
    //         default:
    //             console.log('Opção inválida');
    //             break;
    //     }
    // }

    async play(id) {
        const player = await this.players.getPlayerById(id);
        const players = await this.players.getPlayers(false);
        const count = players.length;
        const index = Math.floor(Math.random() * count);

        if (players[index].id == player.id) {
            this.play(id);
            return;
        }

        this.playRaceEngine(player, players[index]);
    }

    getStatistics() {
        console.log('Mostrando as estatísticas...');
    }

    async getUsers() {
        console.clear();
        this.rl.setOption(['Selecionar Usuário', 'Criar Usuário', 'Ver usuário selecionado', 'Voltar']);

        await this.rl.start();

    }

    async setNewMenu(options) {
        this.rl.setOption(options);
        await this.rl.start();
    }

    async rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    async getRandomBlock() {
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
        }

        return result;
    }

    async logRollResult(characterName, block, diceResult, attribute) {
        console.log(
            `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute
            }`
        );
    }

    setPoints(player, points) {
        this.points[player] = points;
    }

    getPoints(player) {
        return this.points[player];
    }

    async playRaceEngine(character1, character2) {
        for (let round = 1; round <= 5; round++) {
            console.log(`🏁 Rodada ${round}`);

            // sortear bloco
            let block = await this.getRandomBlock();
            console.log(`Bloco: ${block}`);

            // rolar os dados
            let diceResult1 = await this.rollDice();
            let diceResult2 = await this.rollDice();

            //teste de habilidade
            let totalTestSkill1 = 0;
            let totalTestSkill2 = 0;

            if (block === "RETA") {
                totalTestSkill1 = diceResult1 + character1.speed;
                totalTestSkill2 = diceResult2 + character2.speed;

                await this.logRollResult(
                    character1.name,
                    await this.translate("speed"),
                    diceResult1,
                    character1.speed
                );

                await this.logRollResult(
                    character2.name,
                    await this.translate("speed"),
                    diceResult2,
                    character2.speed
                );
            }

            if (block === "CURVA") {
                totalTestSkill1 = diceResult1 + character1.maneuverability;
                totalTestSkill2 = diceResult2 + character2.maneuverability;

                await this.logRollResult(
                    character1.name,
                    await this.translate("maneuverability"),
                    diceResult1,
                    character1.maneuverability
                );

                await this.logRollResult(
                    character2.name,
                    await this.translate("maneuverability"),
                    diceResult2,
                    character2.maneuverability
                );
            }

            if (block === "CONFRONTO") {
                let powerResult1 = diceResult1 + character1.power;
                let powerResult2 = diceResult2 + character2.power;

                console.log(`${character1.name} confrontou com ${character2.name}! 🥊`);

                await this.logRollResult(
                    character1.name,
                    "power",
                    diceResult1,
                    character1.power
                );

                await this.logRollResult(
                    character2.name,
                    "power",
                    diceResult2,
                    character2.power
                );

                if (powerResult1 > powerResult2 && this.getPoints('player2') > 0) {
                    console.log(
                        `${character1.name} venceu o confronto! ${character2.name} perdeu 1 ponto 🐢`
                    );
                    this.setPoints('player2', this.getPoints('player2') - 1);
                }

                if (powerResult2 > powerResult1 && this.getPoints('player1') > 0) {
                    console.log(
                        `${character2.name} venceu o confronto! ${character1.name} perdeu 1 ponto 🐢`
                    );
                    this.setPoints('player1', this.getPoints('player1') - 1);
                }

                console.log(
                    powerResult2 === powerResult1
                        ? "Confronto empatado! Nenhum ponto foi perdido"
                        : ""
                );
            }

            // verificando o vencedor
            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`${character1.name} marcou um ponto!`);
                this.setPoints('player1', this.getPoints('player1') + 1);
            } else if (totalTestSkill2 > totalTestSkill1) {
                console.log(`${character2.name} marcou um ponto!`);
                this.setPoints('player2', this.getPoints('player2') + 1);
            }

            console.log("-----------------------------");
        }
        await this.declareWinner(character1, character2);
    }

    async declareWinner(character1, character2) {
        console.log("Resultado final:");
        console.log(`${character1.name}: ${this.getPoints('player1')} ponto(s)`);
        console.log(`${character2.name}: ${this.getPoints('player2')} ponto(s)`);
        const users = new Users();

        if (this.getPoints('player1') > this.getPoints('player2')) {
            await users.updatePoints(3);
            console.log(`\n${character1.name} venceu a corrida! Parabéns! 🏆`);
        } else if (this.getPoints('player2') > this.getPoints('player1')) {
            console.log(`\n${character2.name} venceu a corrida! Parabéns! 🏆`);
            await users.updatePoints(0);
        } else {
            await users.updatePoints(1);
            console.log("A corrida terminou em empate");
        }


    }


    async translate(str) {
        switch (str) {
            case 'speed':
                return 'velocidade';
            case 'maneuverability':
                return 'manobrabilidade';
            case 'power':
                return 'força';
            default:
                return str;
        }
    }
}