import * as repository from "../repositories/contatoRepository"

let id_contato = 5;

export function listarContatos() {
    return repository.listar()
}

export function getContatoPorId(contatoId) {
    return repository.buscarPorId(contatoId);
}

export function adicionarContato(nome) {
    if (!nome || nome.trim() === "") {
        throw new Error("O nome não pode estar vazio.");
    }
    const contato = {
        id: id_contato,
        nome: nome
    };
    id_contato++;
    return repository.adicionarContato(contato);
}
