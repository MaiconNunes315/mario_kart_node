import readline from 'readline';
import { GameService } from './game-service.js';

export class Readline {
    constructor() {
        this.rl = null;
        this.options = ['Jogar', 'Estatisticas', 'Usuários', 'Sair'];
        // this.options = {
        //     main: ['Jogar', 'Estatisticas', 'Usuários'],
        //     game: ['jogadores', 'Voltar'],
        //     stats: ['Ver Estatísticas', 'Voltar'],
        //     users: ['Selecionar Usuário', 'Criar Usuário', 'Ver usuário selecionado', 'Voltar'],
        //     userselected: ['Ver Usuário Selecionado', 'Voltar']
        // };
        this.selected = 0;
        // this.menu = { main: 1, game: 2, stats: 3, users: 4 };
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
        this.options = options;
        this.selected = 0; // Reseta a seleção para o primeiro item
    }

    async drawMenu(initialize = true) {

        if (initialize) {
            console.clear();
            console.log('Escolha uma opção (↑/↓ para navegar, Enter para selecionar):\n');
        }

        this.options.forEach((opt, index) => {
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
        this.selected = (this.selected - 1 + this.options.length) % this.options.length;
    }

    async moveDown() {
        this.selected = (this.selected + 1) % this.options.length;
    }

    async selectOption() {
        const option = this.options[this.selected];

        if (option === 'Sair') {
            this.exitGracefully();
            return;
        }

        console.clear();
        const game = new GameService(option, this); // passa referência da Readline
        await game.getSelected();
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
