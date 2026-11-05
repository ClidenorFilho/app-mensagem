import * as repository from "../repositories/mensagemRepository"

let id_mensagem = 1;

export function getMensagens(contatoId) {
    return repository.getMensagens(contatoId);
}

export function adicionarMensagem(contatoId, texto) {
    if (!texto || texto.trim() === "") {
        throw new Error("A mensagem não pode estar vazia.");
    }
    const mensagem = {
        id: id_mensagem,
        contatoId: contatoId,
        texto: texto,
        recebido: false
    };
    id_mensagem++;
    return repository.enviarMensagem(mensagem);
}

export function adicionarMensagemRecebida(contatoId, texto) {
    if (!texto || texto.trim() === "") {
        throw new Error("A mensagem não pode estar vazia.");
    }
    const mensagem = {
        id: id_mensagem,
        contatoId: contatoId,
        texto: texto,
        recebido: true
    };
    id_mensagem++;
    return repository.enviarMensagem(mensagem);
}
