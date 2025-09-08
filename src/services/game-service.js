import { Users } from "../models/users.js";
import { Readline } from "./readline.js";

export class GameService {
    constructor(selected) {
        this.selected = selected.toLowerCase();
        this.rl = new Readline();
    }

    async getSelected() {
        const selected = this.selected;
        let users = new Users();
        const res = await users.getUsers();

        switch (selected) {
            case 'jogar':
                this.play();
                break;
            case 'ranking':
                this.getRanking();
                break;
            case 'estatisticas':
                this.getStatistics();
                break;
            case 'usuários':
                console.log('Buscando usuários...');
                await this.getUsers();
                break;
            case 'sair':
                console.log('Saindo do jogo...');
                process.exit(0);
            case 'voltar':
                const options = this.rl.options;
                console.log(options);
                return;
                if (options === 1) {
                    this.getUsers();
                    return;
                }

                this.setNewMenu(['Jogar', 'Estatísticas', 'Usuários', 'Sair']);
                break;
            case 'selecionar usuário':
                break;
            case 'criar usuário':
                console.log('Criar Usuário...');
                const users = new Users();
                const model = users.model();
                console.log('Responda as seguintes perguntas para novo usuário');
                const name = await this.rl.createQuestion('Qual seu nome ? ');
                const age = await this.rl.createQuestion('Qual sua idade ? ');
                model.name = name;
                model.age = age;
                model.active = 'S';
                const user = await users.createUser(model);
                console.log(user);
                break;
            case 'ver usuário selecionado':
                const map = res.map(user => `Cod. ${user.id} - Nome: ${user.name} ${user.active === 'S' ? '✔️' : ''}`);
                console.log(map.join('\n'));
                console.log("")
                this.rl.setOption(['Voltar']);
                await this.rl.start(false);
                break;
            default:
                console.log('Opção inválida');
                break;
        }
    }

    play() {
        console.log('Iniciando o jogo...');
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
}