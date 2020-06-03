import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image} from 'react-native'
import {handleForgotPassword} from "../routes/navigationController"

export default function ForgotPasswordPage(props) {
    const [email, setEmail] = useState("")

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Image style = {{ width: 200, height: 200, marginBottom:10 }}
                source = {require('../pictures/logo.png')}/>
        <Text style = {{fontSize: 20}}>Forgot Password?</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => setEmail(email)}
          value={email}
        />
        {/* <Button color = "#4d2600" title="Send Email" onPress={() => {
          //setPassword("")
          handleForgotPassword(email, props.navigation)} 
          }/> */}
          <TouchableOpacity 
            style = {styles.button}
            activeOpacity = { .5 }
            onPress={() => {handleForgotPassword(email, props.navigation)}}>
            <Text style = {styles.text}>
               Send Email
            </Text>
         </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  text: {
      color:'#fff',
      textAlign:'center',
  },
  button: {
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:10,
    marginRight:10,
    width:200,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#9f8574',
    backgroundColor: '#b7a295'
  }
})