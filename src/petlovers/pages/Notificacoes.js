import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { baseAPI_URL } from '../apiConfig';
import { getAuth } from "firebase/auth";
import 'firebase/database';
import firebase from 'firebase/app';
import CardPet from "../components/CardPet";
import Notificacao from "../components/Notificacao";
import { cardpetsAPI_URL } from "../apiConfig";
import { useNavigation } from '@react-navigation/native';
import Whatsapp from "../components/Whatsapp";


export default function Notificacoes() {
    
  const [loading, setLoading] = useState(true);
  const [matchIds, setMatchIds] = useState([]);
  const [matchDetails, setMatchDetails] = useState([]);
  const [userPetId, setUserPetId] = useState(null);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;


  const fetchMatchDetails = async (matchId) => {
    try {
      const response = await fetch(`${baseAPI_URL}/api/match/${matchId}/details`);
      if (!response.ok) {
        throw new Error("Erro ao obter detalhes do match");
      }
      const data = await response.json();

      console.log(data)
      
      // Mapeando os detalhes dos pets e adicionando ownerName
      const petsWithOwner = data.pets.map(petInfo => ({
        ...petInfo,
        ownerName: petInfo.owner.first_name,
        whatsapp: petInfo.owner.whatsapp,
       
      }));
      console.log(data)
      return {
        ...data,
        pets: petsWithOwner
      };
     
    } catch (error) {
      console.error("Erro ao buscar detalhes do match:", error);
      throw error;
    }
  };


  // Função para obter o ID do pet do usuário logado
  const fetchUserPetId = async (userId) => {
    try {
      const response = await fetch(`${baseAPI_URL}/api/get-pet-data/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setUserPetId(data.petId);
      } else {
        console.error("Erro ao buscar ID do pet do usuário:", data.message);
      }
    } catch (error) {
      console.error("Erro ao buscar ID do pet do usuário:", error);
    }
  };

  // Retorna os matches Id's do user logado
  useEffect(() => {
    const fetchMatchIds = async () => {
      try {
        if (!user) return;

        const userId = user.uid;
        await fetchUserPetId(userId);

        const response = await fetch(`${baseAPI_URL}/api/user/${userId}/matches`);
        const data = await response.json();

        if (response.ok) {
          setMatchIds(data.matchIds);
        } else {
          console.error("Erro ao buscar IDs dos matches do usuário:", data.message);
        }
      } catch (error) {
        console.error("Erro ao buscar IDs dos matches do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchIds();
  }, [user]);


  // Buscar os detalhes de cada match quando os IDs dos matches mudarem
  useEffect(() => {
    const fetchMatchDetailsForIds = async () => {
      try {
        const details = await Promise.all(matchIds.map(fetchMatchDetails));
        setMatchDetails(details);
      } catch (error) {
        console.error("Erro ao buscar detalhes dos matches funcao ids dos macthes:", error);
      }
    };

    if (matchIds.length > 0) {
      fetchMatchDetailsForIds();
    }
  }, [matchIds]);
  

  // Navegação para a tela Info com os parâmetros salvos
  const handleCardPress = (userId, nome, idade, cidade, imageURL, estado, sobre, raca, sexo, cor, porte, id, ownerName, whatsapp) => {
    navigation.navigate('InfoPet', { userId, nome, idade, cidade, imageURL, estado, sobre, raca, sexo, cor, porte, id,  tutor: ownerName, whats: whatsapp });
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <Text style={styles.title}>Notificações</Text>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#827397" />
        ) : matchDetails.length > 0 ? (
          matchDetails.map(match => {
            const isUserPet1 = match.match.pet1_id === userPetId;
            const isUserPet2 = match.match.pet2_id === userPetId;

            if (isUserPet1) {
              const pet2 = match.pets[1].pet;
              const ownerNamePet2 = match.pets[1].owner.first_name;
              const whats2 = match.pets[1].owner.whatsapp;
              

              return (
                <TouchableOpacity key={match.match.id} onPress={() => handleCardPress(pet2.userId, pet2.nome, pet2.idade, pet2.cidade, pet2.imageURL, pet2.estado, pet2.sobre, pet2.raca, pet2.sexo, pet2.cor, pet2.porte, pet2.id, ownerNamePet2, whats2 )}>
                <View style={styles.matchContainer}>
                  <Image
                    source={{ uri: pet2.imageURL }}
                    style={styles.petImage}
                  />
                  <View style={styles.petInfo}>
                    <Text style={styles.text}>
                      {`Você deu match com ${pet2.nome}`}
                    </Text>
                    <Text style={styles.data}>{new Date(match.match.match_date._seconds * 1000).toLocaleDateString()}</Text>
                    <View style={styles.whatsapp}>
                    <Whatsapp cellPhone={whats2}></Whatsapp>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              );
            } else if (isUserPet2) {
              const pet1 = match.pets[0].pet;
              const ownerNamePet1 = match.pets[0].owner.first_name;
              const whats1 = match.pets[0].owner.whatsapp;

              return (
                <TouchableOpacity key={match.match.id} onPress={() => handleCardPress(pet1.userId, pet1.nome, pet1.idade, pet1.cidade, pet1.imageURL, pet1.estado, pet1.sobre, pet1.raca, pet1.sexo, pet1.cor, pet1.porte, pet1.id, ownerNamePet1, whats1)}>
                  <View style={styles.matchContainer}>
                    <Image
                      source={{ uri: pet1.imageURL }}
                      style={styles.petImage}
                    />
                    <View style={styles.petInfo}>
                      <Text style={styles.text}>
                        {`Você deu match com ${pet1.nome}`}
                      </Text>
                      <Text style={styles.data}>{new Date(match.match.match_date._seconds * 1000).toLocaleDateString()}</Text>
                      <View style={styles.whatsapp}>
                      <Whatsapp cellPhone={whats1}></Whatsapp>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          })
        ) : (
          <Notificacao />
        )}
        <View style={styles.card}>
          <CardPet />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 15,
    position: 'relative',
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    color: "#5F5B5B",
  },
  data: {
    color: "#B4AEAE",
    fontSize: 12,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 20,
    marginTop: 35,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whatsapp: {
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'end', // 'flex-end' é a propriedade correta no React Native
    marginRight: -70,
    marginTop: -10,
    alignItems: 'center',
  },
  card: {
    marginTop: 110,
  }
});





