// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });


const ForgotPassword = ( {navigation} ) =>
{
    let [userName, setUsername] = useState('');


let find_Password = () =>
{
    console.log(userName);

    if (!userName)
    {
        alert('put a user Name');
        return;
    }

    db.transaction(function (tx)
    {
        tx.executeSql
        (
            'SELECT * FROM userInfo WHERE userName equals ?',
            [userName],
            (tx, results) =>
            {
                console.log('Results', results.rowAffected);
                if (results.rowAffected > 0)
                {
                    Alert.alert
                    (
                        'Your passWord is ?',[results],
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate('HomeScreen'),
                            },
                        ],
                         { cancelable:false }
                    );
                }else alert('Username not found');

            },
        );
    });
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter your User Id"
            onChangeText={
              (userName) => setUsername(userName)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="find password" customClick={find_Password} />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          Example of SQLite Database in React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;