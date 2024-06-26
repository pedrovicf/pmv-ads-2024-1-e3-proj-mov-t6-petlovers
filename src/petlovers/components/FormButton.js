import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { Button, useTheme, Provider as PaperProvider } from 'react-native-paper';

const FormButton = (props) => (
  <Button style={styles.button} mode="contained" uppercase={false} labelStyle={styles.button} onPress={() => console.log('Pressed')} {...props}>
    
  </Button>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#827397',
    width: '100%', //Tamanho responsivo
    marginTop: 10,
    padding: 5,
    fontSize: 16,
    textTransform: 'none',
    borderRadius: 10,
  }
});

export default FormButton;