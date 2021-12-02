// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Text, SafeAreaView, Image, StyleSheet, Button, ScrollView } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'Default.db' });

const styles = StyleSheet.create({
  logo: {
    width:  236,
    height: 300,
    resizeMode: 'stretch',
    marginRight:'auto',
    marginLeft:'auto',
  },
  text:{
    marginTop: 7,
    paddingLeft: 10,
    color: 'white'
  },
  textInput:{
    marginTop: 5,
    paddingLeft: 10,
    margin: 10,
    borderColor: 'orange',
    borderWidth: 3,
    backgroundColor: 'white'
  }
});

const HomeScreen = ({ navigation }) => {
  
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [cwid, setCWID] = useState('');
  const [confirm_cwid, setConfirm_CWID] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [tempcwid, setTempCWID] = useState('');

 useEffect(() => {

}, []);


let setData =()=> {
  console.log(first_name,last_name,cwid,password)


  if(!first_name || !last_name || !cwid || !password) {
    alert('Please fill in all requirements')
    return;
  }
  if(confirm_cwid != cwid){
      Alert.alert('Warning!', 'Confirm CWID does not match.')
      return;
  }
  if(global.cwid == cwid){
      Alert.alert('Warning!','That CWID exists already.')
      global.cwid = 0
      return;
  }
  else{
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO Users (first_name, last_name, cwid, password) VALUES (?,?,?,?)',
        [first_name,last_name,cwid,password],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {

            db.transaction(function (tx){
              tx.executeSql(
                'SELECT EXISTS (SELECT cwid FROM Users WHERE cwid=?)', [cwid],
                (tx, results) =>{
                  setTempCWID(results.rows.item(0));
                }
              );
            });


            if(tempcwid.cwid == cwid){
                Alert.alert('Warning!','That CWID exists already.')
                global.cwid = 0
                return;
            }

            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Timeline'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
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
          style={styles.text}>Enter Name:
        </Text>
        <Mytextinput
          placeholder="Enter First Name"
          onChangeText={
            (first_name) => setFirstName(first_name)
          }
        />

         <Text style={styles.text}>Enter Last Name:</Text>
         <Mytextinput
           placeholder="Enter Last Name"
           onChangeText={
             (last_name) => setLastName(last_name)
           }
         />

        <Text
          style={styles.text}>Enter CWID:
        </Text>
        <Mytextinput
          placeholder="Enter CWID"
          onChangeText={
            (cwid) => setCWID(cwid)
          }
        />

        <Text
          style={styles.text}>Confirm CWID:
        </Text>
        <Mytextinput
          placeholder="Confirm CWID"
          onChangeText={
            (confirm_cwid) => setConfirm_CWID(confirm_cwid)
          }
        />

        <Text style={styles.text}> Enter Password</Text>
        <Mytextinput
          placeholder="Enter Password"
          onChangeText={
            (password) => setPassword(password)
          }
        />

        <Text style={styles.text}> Confirm Password</Text>
        <Mytextinput
          placeholder="Confirm Password"
          onChangeText={
            (confirm_password) => setConfirmPassword(confirm_password)
          }
        />

        <Mybutton
          title="Create Account"
          customClick={setData}
        />
      </ScrollView>
  </View >
);
};

export default HomeScreen;

