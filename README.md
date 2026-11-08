# App de mensagens (React Native + Expo)

App mobile de mensagens construído com React Native + Expo, com navegação entre lista de contatos e tela de chat.

## Observação importante

No estado atual do projeto, somente o contato **"Comunicar com outro cliente"** (id 1) realiza comunicação entre clientes via MQTT.

- Quando você conversa com esse contato, as mensagens são publicadas no broker MQTT e podem aparecer em outro cliente conectado ao mesmo tópico.
- Os demais contatos (`Clairo`, `Marina` e `Juliano`) funcionam apenas localmente na instância do app aberta no seu dispositivo/emulador.

## Tecnologias

- React Native
- Expo
- React Navigation
- MQTT (`mqtt`)

## Divisão de tarefas (sem pontos)

| # | Tarefa | Responsável | Status |
|---|---|---|---|
| 1 | Criar projeto Expo e instalar dependências | Clidenor | Concluído |
| 2 | Configurar Stack Navigator no App.js | Clidenor | A fazer |
| 3 | MensagemRepository (`getMensagens`, `adicionarMensagem`) | João Vitor | Concluído |
| 4 | MensagemService (validação, instância única) | João Vitor | Concluído |
| 5 | Componente Mensagem (alinhamento/estilo por `recebida`) | João Vitor | Concluído |
| 6 | HomeScreen (4+ contatos, navegação com parâmetros) | Clidenor | Concluído |
| 7 | ChatScreen (layout, nome do contato, lista de mensagens) | Clidenor | Concluído |
| 8 | ChatScreen: envio, limpar campo, bloquear vazia, `useState` | Clidenor | Concluído |
| 9 | Integração MQTT (publicação/assinatura e troca entre clientes) | Clidenor e João Vitor | Concluído |
| 10a | Testes de envio e navegação, ajustes finais (parte 1) | João Vitor | Concluído |
| 10b | Testes de envio e navegação, ajustes finais (parte 2) | Clidenor | Concluído |

## Como rodar

### Pré-requisitos

- Node.js LTS instalado
- npm instalado
- Expo Go no celular (Android/iOS) **ou** emulador Android/iOS configurado

### Passos

1. Entre na pasta do app:

```bash
cd app-mensagem
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o projeto:

```bash
npm expo start
```

4. Abra no dispositivo:

- No celular: escaneie o QR Code com o Expo Go.
- No emulador Android: pressione `a` no terminal do Expo.
- No iOS (macOS): pressione `i` no terminal do Expo.
- No navegador: `npm run web`.

## Como testar

### Teste funcional básico

1. Abra o app e confirme a lista de contatos na Home.
2. Entre em qualquer conversa e envie uma mensagem não vazia.
3. Verifique se:
- A mensagem aparece na lista.
- O campo de texto é limpo após o envio.
- Mensagem vazia não é enviada.

### Teste de comunicação entre clientes (MQTT)

1. Abra o app em **duas instâncias** (por exemplo, dois celulares ou celular + emulador).
2. Nas duas instâncias, entre no contato **"Comunicar com outro cliente"**.
3. Envie mensagem de uma instância e valide se ela aparece na outra.
4. Repita no sentido inverso.

### Comportamento esperado por contato

- Contato **"Comunicar com outro cliente"**: comunicação entre instâncias (MQTT).
- Contatos **"Clairo"**, **"Marina"** e **"Juliano"**: mensagens apenas locais (não sincronizam com outra instância).

## Configuração de broker e tópico

O projeto usa as configurações em `app-mensagem/config.js`:

- `BROKER`: `wss://mqtt.acilab.com.br`
- `TOPIC`: `ufc-quixada/aula18b/dupla07`

Se mudar o tópico, use o mesmo valor em todas as instâncias para que a troca de mensagens funcione.
