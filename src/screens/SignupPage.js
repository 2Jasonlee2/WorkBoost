// SignUp.js
import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import {handleSignUp, navLogin} from "../routes/navigationController"

export default function SignupPage(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 20}}>Register a new account!</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <Button color = "#4d2600" title="Sign Up" onPress={() => {
        //setPassword("")
        handleSignUp(email, password, props.navigation)}} />
      <Button
        color = "#4d2600"
        title="Already have an account? Login"
        onPress={() => {
          setPassword("")
          setEmail("")
          navLogin(props.navigation)}}
      />
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
  }
})