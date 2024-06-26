import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import Home from "../pages/Home";
import Sobre from "../pages/Sobre";
import Login from "../pages/Login";
import Notificacoes from "../pages/Notificacoes";
import Cadastro from "../pages/Cadastro";
import Header from "../components/Header";
import CadastroPet from "../pages/CadastroPet";
import Politica from "../pages/Politica";
import BuscarPet from "../pages/BuscarPet";
import InfoPet from "../pages/InfoPet";
import Avaliacoes from "../pages/Avaliacoes";
import Termos from "../pages/Termos";
import MinhaContaScreen from "../pages/MinhaConta";
import VerPerfil from "../pages/VerPerfil";
import DadosPet from "../pages/DadosPet";
import DadosUser from "../pages/DadosUser";
import Favoritos from "../pages/Favoritos";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";


// Navegacao bottom navigation
const homeName = "Home";
const sobreName = "Sobre nos";
const notificacoesName = "Notificacoes";
const loginName = "Login";
const MinhaConta = "Minha Conta";
const heartName = "Favoritos";

const Tab = createBottomTabNavigator();

function getScreenOptions(route, loginName) {
  return {
    style: { display: "flex" },
    tabBarStyle: {
      backgroundColor: "transparent",
    },
    tabBarIconStyle: {
      backgroundColor: "transparent",
    },
    tabBarVisible: route.name !== loginName,
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === homeName) {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === sobreName) {
        iconName = focused ? "book" : "book-outline";
      } else if (route.name === notificacoesName) {
        iconName = focused ? "notifications" : "notifications-outline";
      } else if (route.name === loginName) {
        iconName = focused ? "person" : "person-outline";
      } else if (route.name === MinhaConta) {
        iconName = focused ? "person" : "person-outline";
      } else if (route.name === heartName) {
        iconName = focused ? "heart" : "heart-outline";
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#827397",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
      display: "flex",
      height: 90,
      paddingVertical: 5,
    },
    tabBarLabel: () => null,
  };
}
function TabNavigator() {
  const [userLogado, setUserLogado] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    user?.displayName.length > 0 ? setUserLogado(true) : false;
  });

  if (userLogado) {
    return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => getScreenOptions(route, loginName)}
      >
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={sobreName} component={Sobre} />
        <Tab.Screen name={notificacoesName} component={Notificacoes} />
        <Tab.Screen name={heartName} component={Favoritos} />
        <Tab.Screen name={MinhaConta} component={MinhaContaScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  } else
    return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => getScreenOptions(route, loginName)}
      >
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={sobreName} component={Sobre} />
        <Tab.Screen name={loginName} component={Login} />
      </Tab.Navigator>
    );
}

//Navegacao telas
const Stack = createStackNavigator();

export default function Navigations() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ header: () => <Header showHeader={true} /> }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroPet"
          component={CadastroPet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Politica"
          component={Politica}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Busca"
          component={BuscarPet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DadosUser"
          component={DadosUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoPet"
          component={InfoPet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Avaliacoes"
          component={Avaliacoes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Termos"
          component={Termos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerPerfil"
          component={VerPerfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DadosPet"
          component={DadosPet}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MinhaConta"
          component={MinhaContaScreen}
          options={{ headerShown: false }}
        />

        {/* Criar aqui outras navegacoes  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}