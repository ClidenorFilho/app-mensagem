import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as serviceContatos from "../services/contatoService"


export default function HomeScreen({ navigation }) {

  const contatos = serviceContatos.listarContatos();

  return (
    <View style={styles.container}>
      <FlatList
        data={contatos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Chat', { contatoId: item.id, contatoNome: item.nome })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nome: {
    fontSize: 16,
  },
});
