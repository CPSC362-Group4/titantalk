// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, ScrollView} from 'react-native';
import Mybutton from "./components/Mybutton";
import Mytext from "./components/Mytext";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "Default.db" });

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },

  logo: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 35,
    marginBottom: 50
  }
});

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Users'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Users', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Users(ID INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(20), last_name VARCHAR(20), cwid INT(9),password VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#055C9D" }}>
      <ScrollView style={styles.scrollview}>
      <Image
            style={styles.logo}
            source={require('./images/Tuffy.png')}
          />

          <Mybutton
            title="Create Account"
            customClick={() => navigation.navigate('CreateScreen')}
          />
          <Mybutton
            title="Login"
            customClick={() => navigation.navigate('LoginScreen')}
          />
          <Mybutton
            title="Forgot Account Info"
            customClick={() => navigation.navigate('ForgotPassword')}
          />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
