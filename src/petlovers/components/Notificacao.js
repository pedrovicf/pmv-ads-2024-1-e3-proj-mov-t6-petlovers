import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function Notificacao() {
    return (
<SafeAreaView>
     <View style={styles.view}>
     <Text style={styles.texto}>Seu perfil ainda não foi curtido de volta :(</Text>
    </View>  
</SafeAreaView>
    );
}

const styles = StyleSheet.create ({
    view: {
        marginTop: 30,
        marginTop: 50,     
        
    },
    texto: {
       color: '#827397',
       fontWeight: 'bold',
       justifyContent: 'center',
       textAlign: 'center',
       fontSize: 15,
       marginTop: 40,
    }
})