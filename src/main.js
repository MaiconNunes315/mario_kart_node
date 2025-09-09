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




