import readline from 'readline';
import { GameService } from './game-service.js';
import { Players } from '../models/players.js';

export class Readline {
    constructor() {
        this.rl = null;
        this.menus = {
            main: ['Jogar', 'Estatisticas', 'Usuários', 'Sair'],
            game: ['Voltar'],
            stats: ['Ver Estatísticas', 'Voltar'],
            users: ['Selecionar Usuário', 'Criar Usuário', 'Ver usuário selecionado', 'Voltar'],
            userselected: ['Ver Usuário Selecionado', 'Voltar']
        };
        this.menuStack = ['main']; // pilha de navegação
        this.selected = 0;
    }

    createInterface() {
        if (!this.rl) {
            this.rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
        }
    }

    createQuestion(question) {
        return new Promise((resolve) => {
            // Garante que sempre teremos uma interface ativa
            this.createInterface();

            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }

    close() {
        if (this.rl) {
            this.rl.close();
            this.rl = null; // marca como fechada
        }
    }

    setOption(options) {
        // Mantido para compatibilidade, mas não é mais usado diretamente
        this.menus[this.getCurrentMenu()] = options;
        this.selected = 0;
    }

    getCurrentMenu() {
        return this.menuStack[this.menuStack.length - 1];
    }

    async drawMenu(initialize = true) {
        if (initialize) {
            console.clear();
            console.log('Escolha uma opção (↑/↓ para navegar, Enter para selecionar):\n');
        }
        const options = this.menus[this.getCurrentMenu()];
        options.forEach((opt, index) => {
            console.log(index === this.selected ? `> ${opt}` : `  ${opt}`);
        });
    }

    async setupInput() {
        process.stdin.removeAllListeners('keypress');
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', async (str, key) => await this.handleKeypress(key));
    }

    async handleKeypress(key) {
        if (key.name === 'up') {
            await this.moveUp();
        } else if (key.name === 'down') {
            await this.moveDown();
        } else if (key.name === 'return') {
            await this.selectOption();
            return;
        } else if (key.ctrl && key.name === 'c') {
            process.exit();
        }
        await this.drawMenu();
    }

    async moveUp() {
        const options = this.menus[this.getCurrentMenu()];
        this.selected = (this.selected - 1 + options.length) % options.length;
    }

    async moveDown() {
        const options = this.menus[this.getCurrentMenu()];
        this.selected = (this.selected + 1) % options.length;
    }

    async selectOption() {
        const currentMenu = this.getCurrentMenu();
        const options = this.menus[currentMenu];
        const option = options[this.selected];

        if (option === 'Sair') {
            this.exitGracefully();
            return;
        }

        if (option === 'Voltar') {
            if (this.menuStack.length > 1) {
                this.menuStack.pop();
                this.selected = 0;
                await this.drawMenu(true);
            }
            return;
        }
        const game = new GameService(option, this); // passa referência da Readline
        // Navegação para submenus
        if (option === 'Jogar') {

            if (this.menus.game.length == 1) {
                const players = await (new Players()).getPlayers();
                this.menus.game.unshift(...players);
            }

            // game.selectedPlayer();
            this.menuStack.push('game');
            this.selected = 0;
            await this.drawMenu(true);
            return;
        } else if (option === 'Estatisticas') {
            this.menuStack.push('stats');
            this.selected = 0;
            await this.drawMenu(true);
            return;
        } else if (option === 'Usuários') {
            this.menuStack.push('users');
            this.selected = 0;
            await this.drawMenu(true);
            return;
        } else if (option === 'Ver usuário selecionado') {
            this.menuStack.push('userselected');
            this.selected = 0;
            await this.drawMenu(true);
            return;
        } else {
            if (currentMenu === 'game') {
                console.log(`Você selecionou o jogador: ${option}`);
                const id = option.split(' - ')[0];
                await game.play(id);
                return;
            }
        }

        // Aqui você pode chamar a lógica do GameService ou outras ações específicas
        // console.clear();

        // await game.getSelected();
    }

    async start(initialize = true) {
        await this.setupInput();
        await this.drawMenu(initialize);
    }

    exitGracefully() {
        console.clear();
        console.log('Encerrando...');
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.kill(process.pid, 'SIGINT');
    }
}
