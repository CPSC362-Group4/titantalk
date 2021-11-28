// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import Mybutton from "./components/Mybutton";
import Mytext from "./components/Mytext";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "UserDatabase.db" });

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
  return (
    <View style={{ flex: 1, backgroundColor: "#055C9D" }}>
      <ScrollView style={styles.scrollview}>
        <Image style={styles.logo} source={require("./images/Tuffy.png")} />

        <Mybutton
          title="Create Account"
          customClick={() => navigation.navigate("CreateScreen")}
        />
        <Mybutton
          title="Login"
          customClick={() => navigation.navigate("LoginScreen")}
        />
        <Mybutton
          title="Forgot Account Info"
          customClick={() => navigation.navigate("ForgotPassword")}
        />
        <Mybutton
          //delete block once done linking on homepage
          title="Profile Page Info"
          customClick={() => navigation.navigate("Profile")}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
