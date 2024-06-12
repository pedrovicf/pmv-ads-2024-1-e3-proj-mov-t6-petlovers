import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importando o ícone do Expo

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadFavoritos = async () => {
        try {
          const favoritosData = await AsyncStorage.getItem('favoritos');
          if (favoritosData !== null) {
            setFavoritos(JSON.parse(favoritosData));
          }
        } catch (error) {
          console.error('Erro ao carregar favoritos:', error);
        }
      };

      loadFavoritos();

      return () => {
        // Optional: Any cleanup code if needed
      };
    }, [])
  );

  const removeFavorito = async (index) => {
    try {
      const updatedFavoritos = favoritos.filter((_, i) => i !== index);
      await AsyncStorage.setItem('favoritos', JSON.stringify(updatedFavoritos));
      setFavoritos(updatedFavoritos);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const confirmRemoverFavorito = (index) => {
    Alert.alert(
      'Remover Favorito',
      'Tem certeza de que deseja remover este pet dos favoritos?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => removeFavorito(index),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <FlatList
        data={favoritos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.imageURL }} style={styles.petImage} />
            <View style={styles.petInfo}>
              <Text style={styles.cardText}>{item.nome}</Text>
              <Text style={styles.cardText}>{item.idade} anos</Text>
              <Text style={styles.cardText}>{item.raca}</Text>
            </View>
            {/* Substituído o botão de remover pelo botão de coração */}
            <TouchableOpacity style={styles.heartButton} onPress={() => confirmRemoverFavorito(index)}>
              <Ionicons name="heart" size={24} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Torna a imagem redonda
    marginRight: 10,
  },
  petInfo: {
    flex: 1,
  },
  cardText: {
    fontSize: 18,
  },
  heartButton: {
    // Botão de coração
    padding: 10,
  },
});

export default Favoritos;
