import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';


// Screens
import Home from './screens/Home';
import Sobre from './screens/Sobre';
import Notificacoes from './screens/Notificacoes';

// Screens names
const homeName = 'Home';
const sobreName = 'Sobre nos';
const notificacoesName = 'Notificacoes';

const Tab = createBottomTabNavigator();

export default function BottomNavigation(){
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === sobreName) {
                            iconName = focused ? 'book' : 'book-outline';
                        } else if (route.name === notificacoesName) {
                            iconName = focused ? 'notifications' : 'notifications-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#827397',
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },

                    tabBarLabel: () => null // Remover o texto abaixo dos ícones
                })}
                tabBarOptions={{
                    style: { display: 'flex' } 
                }}
            >
                <Tab.Screen name={homeName} component={Home} />
                <Tab.Screen name={sobreName} component={Sobre} />
                <Tab.Screen name={notificacoesName} component={Notificacoes} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
