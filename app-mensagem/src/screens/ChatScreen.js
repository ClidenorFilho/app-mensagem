import React, { useState, useEffect } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getMensagens, adicionarMensagem } from '../services/mensagemService';
import Mensagem from '../components/mensagem';
import { mqttService } from '../services/mqttService';
import { TOPIC } from '../../config';

export default function ChatScreen({ route }) {
  const insets = useSafeAreaInsets();
  const { contatoId } = route.params;
  const [mensagens, setMensagens] = useState([...getMensagens(contatoId)]);
  const [texto, setTexto] = useState('');

  useEffect(() => {
      const cancelar = mqttService.subscribe(TOPIC, () => {
          setMensagens([...getMensagens(contatoId)]);
      });

      return () => cancelar();
  }, [contatoId]);

  function enviar() {
    try {
        adicionarMensagem(contatoId, texto.trim());

        setMensagens([...getMensagens(contatoId)]);
        setTexto('');
    } catch (e) {
        console.error(e);
    }    
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
            <Mensagem
              texto={item.texto}
              recebido={item.recebido}
            />
        )}
      />

      <View style={[styles.rodape, { paddingBottom: 8 + insets.bottom }]}>
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
