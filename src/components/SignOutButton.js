import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

export default function SignOutButton() {
    return(
        <TouchableOpacity
                style={styles.signOutButton}
                onPress={() => Alert.alert('Signing out')}
                underlayColor='#fff'>
                <Text style={styles.buttonText}>SIGN OUT</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    signOutButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#000066',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      buttonText:{
        fontSize:19,
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
      }
  });