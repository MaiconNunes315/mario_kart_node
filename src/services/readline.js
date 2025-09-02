import readline from 'readline';
import { GameService } from './game-service.js';

export class Readline {
    constructor() {
        this.rl = null;
        this.options = ['Jogar', 'Ranking', 'Estatisticas', 'Jogadores', 'Sair'];
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
        this.options = options;
    }

    drawMenu() {
        console.clear();
        console.log('Escolha uma opção (↑/↓ para navegar, Enter para selecionar):\n');
        this.options.forEach((opt, index) => {
            if (index === this.selected) {
                console.log(`> ${opt}`);
            } else {
                console.log(`  ${opt}`);
            }
        });
    }

    setupInput() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (str, key) => this.handleKeypress(key));
    }

    handleKeypress(key) {
        if (key.name === 'up') {
            this.moveUp();
        } else if (key.name === 'down') {
            this.moveDown();
        } else if (key.name === 'return') {
            this.selectOption();
        } else if (key.ctrl && key.name === 'c') {
            process.exit();
        }
        this.drawMenu();
    }

    moveUp() {
        this.selected = (this.selected - 1 + this.options.length) % this.options.length;
    }

    moveDown() {
        this.selected = (this.selected + 1) % this.options.length;
    }

    selectOption() {

        if (this.options[this.selected] === 'Sair') {
            this.exitGracefully();
            return;
        }

        console.clear();
        const game = new GameService(this.options[this.selected]);
        game.getSelected();
        process.exit();
    }

    start() {
        this.setupInput();
        this.drawMenu();
    }

    exitGracefully() {
        console.clear();
        console.log('Encerrando...');
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.kill(process.pid, 'SIGINT');
    }
}
