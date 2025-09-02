export class DefaultModel {
    translate(string) {
        const tranlate = {
            name: 'nome',
            age: 'idade',
            active: 'ativo'
        }
        return tranlate[string];
    }
}