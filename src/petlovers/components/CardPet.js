import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//API URL dos cards
import { cardpetsAPI_URL } from "../apiConfig";


export default function CardPet() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const goToBusca = () => {navigation.navigate('Busca')};
 
    useEffect(() => {
        fetch(cardpetsAPI_URL) //API URL dos cards
            .then((response) => response.json())
            .then((responseData) => {
               
                setData(responseData.data);
               
                responseData.data.forEach(item => console.log(item.id));
            })
            .catch((error) => console.error('Error:', error));
    }, []);

    //navegacao para a tela info com os parametros salvos
    const handleCardPress = (userId, nome, idade, cidade, imageURL, estado, sobre, raca, sexo, cor, porte, id) => {
        navigation.navigate('InfoPet', { userId, nome, idade, cidade, imageURL, estado, sobre, raca, sexo, cor, porte, id}); 
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.align}>
                <Text style={styles.title}>Encontre o par ideal</Text>
                <Text onPress={goToBusca} style={styles.text2}>ver mais</Text>
            </View>
            <FlatList
                horizontal={true}
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCardPress(item.userId, item.nome, item.idade, item.cidade, item.imageURL, item.estado, item.sobre, item.raca, item.sexo, item.cor, item.porte, item.id)} style={{ paddingBottom: 70 }}> 
                    <View style={styles.cards1}>
                        <Image style={styles.imgcards} source={{ uri: item.imageURL }} />
                        <Text key={item.id} style={styles.text}>{item.nome}, {item.idade} anos</Text>
                        <View style={styles.local}>
                            <Ionicons style={styles.icon} name='location-outline' size={19} />
                            <Text key={item.id} style={styles.text1}>{item.cidade}</Text>            
                        </View>
                    </View>
                 </TouchableOpacity>
                )}
            />
        </View>


    );
}


const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#5F5B5B',
        marginTop: 20,
        marginLeft: -28,
    },
    text: {
        color: '#5F5B5B',
        fontSize: 18,
        marginTop: 20,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    text1: {
        color: '#5F5B5B',
        fontSize: 15,
        marginLeft: 5,
        marginTop: 8,
        marginBottom: 15,
    },
    local: {
        flexDirection: 'row',
    },
    icon: {
        marginTop: 5,
        marginLeft: 8,
        color: "#827397",
    },
    cards1: {
        width: 160,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginRight: 10,
        flex: 1,
        flexWrap: 'row',
        marginTop: 15,
        alignSelf: 'flex-start',
    },
    imgcards: {
        width: 160,
        height: 150,
        borderRadius: 5,
        borderBottomRightRadius: 25,
    },
    align: {
        marginTop: 30,
        flexDirection: 'row',
    },
    text2: {
        color: '#5F5B5B',
        fontSize: 12,
        marginTop: 23,
        marginLeft: 92,
    },

})