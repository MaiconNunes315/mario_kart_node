export class FetchService {
    constructor() {
        this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    }

    async get(endpoint, params = {}) {
        const query = new URLSearchParams(params).toString();
        const url = `${this.baseUrl}/${endpoint}${query ? '?' + query : ''}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Erro na busca:', err);
        }
    }

    async set(endpoint, data) {

        const url = `${this.baseUrl}/${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar dados');
            }
            const json = await response.json();
            console.log(json);
            return json;
        } catch (err) {
            console.error('Erro ao enviar dados:', err);
        }
    }

    async patch(endpoint, data) {
        const url = `${this.baseUrl}/${endpoint}/${data.id}`;
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar dados');
            }
            const json = await response.json();

            return json;
        } catch (err) {
            console.error('Erro ao atualizar dados:', err);
        }
    }
}