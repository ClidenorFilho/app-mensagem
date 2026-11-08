import mqtt from 'mqtt';
import { BROKER, TOPIC } from '../../config';
import * as mensagemRepository from "../repositories/mensagemRepository"

export default class MqttService {
    constructor() {
        this.clientId = `mqtt_rn_${Math.random().toString(16).slice(2)}`;

        this.mqttClient = mqtt.connect(BROKER, {
            clientId: this.clientId,
            clean: true,
            connectTimeout: 4000,
        });

        this.mqttClient.on('connect', () => {
            console.log('Conectado!', this.clientId);
        });
    }

    subscribe(topico = TOPIC, callback) {

        this.mqttClient.subscribe(topico, (err) => {
            if (err) {
                console.error("Erro ao inscrever:", err);
            }
        });

        const listener = (topic, message) => {

            if (topic !== topico) return;

            try {
                const mensagem = JSON.parse(message.toString());

                if (mensagem.mqttOrigemId === this.clientId) return;

                mensagemRepository.enviarMensagem(mensagem);
                callback(topic, mensagem);
            } catch (error) {
                console.error("Erro ao processar mensagem:", error);
            }
        };

        this.mqttClient.on("message", listener);

        return () => {
            this.mqttClient.removeListener("message", listener);
            this.mqttClient.unsubscribe(topico);
        };
    }

    publish(topico, mensagem) {
        const mensagem_origem = {
            ...mensagem,
            mqttOrigemId: this.clientId
        }

        this.mqttClient.publish(topico, JSON.stringify(mensagem_origem));
    }
}
export const mqttService = new MqttService();