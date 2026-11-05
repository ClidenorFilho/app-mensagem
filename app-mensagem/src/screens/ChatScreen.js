import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { getMensagens, adicionarMensagem } from '../services/mensagemService';

export default function ChatScreen({ route }) {
  const { contatoId } = route.params;
  const [mensagens, setMensagens] = useState([...getMensagens(contatoId)]);
  const [texto, setTexto] = useState('');

  function enviar() {
    try {
      adicionarMensagem(contatoId, texto.trim());
    } catch (e) {
      return;
    }
    setMensagens([...getMensagens(contatoId)]);
    setTexto('');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={mensagens}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bolha,
              item.recebido ? styles.bolhaEsquerda : styles.bolhaDireita,
            ]}
          >
            <Text style={styles.textoMensagem}>{item.texto}</Text>
          </View>
        )}
      />

      <View style={styles.rodape}>
        <TextInput
          style={styles.input}
          value={texto}
          onChangeText={setTexto}
          placeholder="Digite uma mensagem..."
        />
        <TouchableOpacity style={styles.botao} onPress={enviar}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lista: {
    padding: 12,
    flexGrow: 1,
  },
  bolha: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  bolhaDireita: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  bolhaEsquerda: {
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
  },
  textoMensagem: {
    fontSize: 15,
  },
  rodape: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  botao: {
    backgroundColor: '#25D366',
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
