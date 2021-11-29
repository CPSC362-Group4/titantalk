import React, { useState } from "react";
import {
  View,
  Image,
  Title,
  Caption,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "UserDatabase.db" });

const Profile = () => {
  let [userData, setUserData] = useState({});
  let searchUser = () => {
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_user where user_id = ?",
        [4],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            setUserData(results.rows.item(0));
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 20 }}>
        <Image
          style={styles.profileImage}
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20 }}> Username: {"TestProfile"}</Text>
          <Text> Contact: {"(123) 456-7890"}</Text>
          <Text> Address: {"123 w Pioneer Way"}</Text>
          <Text> Email:{" test@gmail.com "}</Text>
        </View>
      </View>
      <View style={styles.search_button}>
        <Mybutton title="Search User" customClick={searchUser} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 9,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  search_button: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end"
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    alignSelf: "center"
  }
});
