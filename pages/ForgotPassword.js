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

var db = openDatabase({ name: 'Default.db' });


const ForgotPassword = ( {navigation} ) =>
{
    let [cwid, setCWID] = useState('');
    let [temp, setTempCWID] = useState('');


let find_Password = () =>
{
  setTempCWID({});
  
    console.log(cwid);

    if (!cwid)
    {
        alert('put a user Name');
        return;
    }

    db.transaction(function (tx)
    {
        tx.executeSql
        (
            'SELECT EXISTS (SELECT password FROM Users WHERE cwid= ?)',
            [cwid],
            (tx, results) =>
            {
              setTempCWID(results.rows.item(0));
                console.log('Results', results.rowAffected);
                if (temp == cwid)
                {
                    Alert.alert
                    (
                        'Your passWord is ?'[temp],
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate('HomeScreen'),
                            },
                        ],
                         { cancelable:false }
                    );
                }else alert('CWID not found');

            },
        );
    });
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter your CWID"
            onChangeText={
              (cwid) => setCWID(cwid)
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
