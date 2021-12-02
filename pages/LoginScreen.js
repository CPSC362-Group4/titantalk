// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Text, SafeAreaView, Image, StyleSheet, Button,ScrollView } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: "Default" });

const styles = StyleSheet.create({
  logo: {
    width: 354,
    height: 450,
    resizeMode: "stretch",
    marginRight: "auto",
    marginLeft: "auto"
  },
  header: {
    fontWeight: "bold",
    color: "white",
    fontSize: 35,
    marginTop: 20,
    marginBottom: 20,
    marginRight: "auto",
    marginLeft: "auto"
  },
  text: {
    marginTop: 7,
    paddingLeft: 10,
    color: "white"
  },
  textInput: {
    marginTop: 5,
    paddingLeft: 10,
    margin: 10,
    borderColor: "orange",
    borderWidth: 3,
    backgroundColor: "white"
  }
});

const HomeScreen = ({ navigation }) => {
  
  const [cwid, setCWID] = useState('');
  const [password, setPassword] = useState('');
  const [tempcwid, setTempCWID] = useState('');

  const getData = () => {
    setTempCWID({});

    db.transaction((tx)=>{
      tx.executeSql(
        'SELECT cwid, password FROM Users WHERE cwid=?', [cwid],
        (tx, results) =>{
          setTempCWID(results.rows.item(0));
        }
      );
    });

    if(tempcwid.cwid == cwid && tempcwid.password == password){
      global.cwid = cwid
      navigation.navigate('Timeline');
    }
    else{
      Alert.alert('CWID or Password is incorrect.')
      return;
    }
  }

  return (
    <View style={{ flex: 1,backgroundColor: '#055C9D' }}>
      <ScrollView style={styles.scrollview}>
        <Image
            style={styles.logo}
            source={require('./images/Tuffy.png')}
        />
        <Text
          style={styles.header}>Welcome Back!
        </Text>
        <Text
          style={styles.text}>Enter CWID:
        </Text>
        <Mytextinput
          placeholder="CWID"
          onChangeText={
            (cwid) => setCWID(cwid)
          }
        />

        <Text style={styles.text}> Enter Password</Text>
        <Mytextinput
          placeholder="Password"
          onChangeText={
            (password) => setPassword(password)
          }
        />

        <Mybutton
          title="Login"
          customClick={getData}
        />
      </ScrollView>
    </View >
  );
};

export default HomeScreen;
