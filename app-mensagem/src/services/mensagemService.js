import * as repository from "../repositories/mensagemRepository"
import { mqttService } from "./mqttService";
import { TOPIC } from "../../config";

function gerarId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getMensagens(contatoId) {
    return repository.getMensagens(contatoId);
}

export function adicionarMensagem(contatoId, texto) {
    if (!texto || texto.trim() === "") {
        throw new Error("A mensagem não pode estar vazia.");
    }
    const mensagem_enviar = {
        id: gerarId(),
        contatoId: contatoId,
        texto: texto,
        recebido: false,
    };
    
    if(contatoId == 1) {
        const mensagem_mqtt = {
            ...mensagem_enviar,
            recebido: true
        };
        console.log("passoui")
        mqttService.publish(TOPIC,mensagem_mqtt);
    }

    return repository.enviarMensagem(mensagem_enviar);
}

export function adicionarMensagemRecebida(contatoId, texto) {
    if (!texto || texto.trim() === "") {
        throw new Error("A mensagem não pode estar vazia.");
    }
    const mensagem = {
        id: id_mensagem,
        contatoId: contatoId,
        texto: texto,
        recebido: true,
    };
    id_mensagem++;
    return repository.enviarMensagem(mensagem);
}
