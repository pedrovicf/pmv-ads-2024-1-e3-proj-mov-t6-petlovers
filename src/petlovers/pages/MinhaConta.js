import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "../components/ArrowLeft";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { getUserByIdAPI_URL } from "../apiConfig";
import { getAuth } from "firebase/auth";

export default function MinhaConta({ navigation }) {
  const goToVerPerfil = () => {
    navigation.navigate('VerPerfil');
  };
  
  const goToDadosPet = () => {
    navigation.navigate('DadosPet');
  };
  
  const goToDadosUser = () => {
    navigation.navigate('DadosUser');
  };
  
  const handleLogout = () => {
    // Lógica para fazer logout do usuário
  };

  const auth = getAuth();
  const user = auth.currentUser;

    // Função para excluir a conta
  const handleDeleteAccount = async () => {
    try {
      if (!user) {
        return; // Pare a execução da função para evitar que o código a seguir seja executado
      }
  
      // Exibir um alerta de confirmação antes de excluir a conta
      Alert.alert(
        "Excluir conta",
        "Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Excluir",
            onPress: async () => {
              const userId = user.uid; // ID do usuário autenticado
  
              const response = await fetch(getUserByIdAPI_URL(userId), {
                method: "DELETE",
              });
  
              if (response.ok) {
                // Conta excluída com sucesso
                Alert.alert("Sucesso", "Sua conta foi excluída com sucesso.");
                // Navegar para a tela de login ou outra tela após excluir a conta
              } else {
                // Erro ao excluir a conta
                Alert.alert("Erro", "Erro ao excluir sua conta.");
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      Alert.alert("Erro", "Erro ao excluir sua conta.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ArrowLeft style={styles.arrow} />
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Minha Conta</Text>
        <TouchableOpacity style={styles.item} onPress={goToVerPerfil}>
          <Text style={styles.subTitle}>Ver Perfil Pet</Text>
          <Text style={styles.icon}>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={goToDadosPet}>
          <Text style={styles.subTitle}>Editar dados pet</Text>
          <Text style={styles.icon}>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={goToDadosUser}>
          <Text style={styles.subTitle}>Editar meus dados</Text>
          <Text style={styles.icon}>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAccount} style={styles.item}>
          <Text style={styles.subTitle}>Excluir Conta</Text>
          <Text style={styles.icon}>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'flex-start',
  },
  arrow: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 10,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
    color: 'gray',
  },
  logoutButton: {
    backgroundColor: '#827397', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 'auto', // Coloca o botão "Sair" no final da tela
    marginBottom: 20, // Espaço extra no final da tela
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
