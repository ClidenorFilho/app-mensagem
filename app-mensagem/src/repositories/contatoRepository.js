const contatos = [
    {
        id: 1,
        nome: "Comunicar com outro cliente"
    },
    {
        id: 2,
        nome: "Clairo",
    },
    {
        id: 3,
        nome: "Marina"
    },
    {
        id: 4,
        nome: "Juliano"
    }
]

export function listar() {
    return contatos;
}

export function buscarPorId(id) {
    return contatos.find((contato) => contato.id === id);
}

export function adicionarContato(contato) {
    contatos.push(contato);
    return contato;
}