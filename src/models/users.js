import { FetchService } from "../services/fetch-service.js";
import { DefaultModel } from "./defaultModel.js";

export class Users extends DefaultModel {
    constructor() {
        super()
        this.service = new FetchService();
        this.table = "users"
    }

    async createUser(data) {

        if (!data.active) {
            data.active = 'N';
        }
        let message = {};
        for (const element in data) {

            if (!data[element]) {
                message.status = 'error';
                message[element] = `Campo ${this.translate(element)} Obrigatório`;
            }
        }

        if (message.status === 'error') {
            return message;
        }

        return await this.service.set(this.table, data);
    }

    model() {
        return {
            name: null,
            age: null,
            active: 'N'
        }
    }

    async getUsersConditions(conditions) {
        const response = await fetch(`${process.env.BASE_URL}/users/${conditions}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }

        return await data;
    }

    async getUsers() {
        const req = new FetchService();
        const data = await req.get(this.table);

        return await data;
    }
}
