const mensagens = []

export function getMensagens(contatoId) {
    return mensagens.filter((mensagem) => mensagem.contatoId == contatoId);
}

export function enviarMensagem(mensagem) {
    mensagens.push(mensagem);
    return mensagem;
}