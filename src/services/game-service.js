export class GameService {
    constructor(selected) {
        this.selected = selected;
    }

    getSelected() {
        const selected = this.selected.toLowerCase();

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
            case 'jogadores':
                this.getPlayers();
                break;
            case 'sair':
                console.log('Saindo do jogo...');
                process.exit(0);
            default:
                console.log('Opção inválida');
                break;
        }
    }

    play() {
        console.log('Iniciando o jogo...');
    }

    getRanking() {
        console.log('Mostrando o ranking...');
    }

    getStatistics() {
        console.log('Mostrando as estatísticas...');
    }

    getPlayers() {
        console.log('Mostrando os jogadores...');
    }
}