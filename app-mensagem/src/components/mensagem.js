import { View, Text, StyleSheet } from 'react-native';

export default function Mensagem({ texto, recebido }) {
  return (
    <View
      style={[
        styles.bolha,
        recebido ? styles.bolhaEsquerda : styles.bolhaDireita,
      ]}
    >
      <Text style={styles.textoMensagem}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});