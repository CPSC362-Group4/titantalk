import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import HomeScreen from './CreateScreen';
import { openDatabase } from 'react-native-sqlite-storage';

var  db = openDatabase({ name: 'Default.db' });
const Profile = () => {

  let[userData, setUserData] = useState({});

  useEffect(() => {
       getData();
 }, []);

  const getData = () => {
    setUserData({});
    try {
        db.transaction((tx)=>{
            tx.executeSql(
              "SELECT first_name, last_name, cwid FROM Users WHERE cwid=?",[global.cwid],
              (tx,results) => {
                var len = results.rows.length;
                console.log('len', len);
                if (len > 0) {
                  setUserData(results.rows.item(0));
                } else {
                  alert('No user found');
                }
              }
            );
        });

    } catch (error) {
        console.log(error);
    }

  }

    return (
        <SafeAreaView style={styles.container}>
            <View style= {{flexDirection: 'column', marginTop: 15, marginLeft: 70}}>
              <Image
                  style={styles.profileImage}
                  source ={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',}}
              />
              <View style={styles.info}>
                <View style={{marginLeft: 0}}>
                  <Text style={{fontSize: 25}}> {userData.first_name + ' '+ userData.last_name} </Text>
                  <Text style={{fontSize: 15, marginLeft: 25}}> Cwid: {userData.cwid} </Text>
                </View>
              </View>
            <View style= {{flexDirection: 'row', marginTop: 35, marginLeft: 0}}>
              <View style={styles.user_info}>
                <View style= {{flexDirection: 'row'}}>
                  <View style={{marginLeft: 5}}>
                    <Text style={{fontSize: 20}}> {"0"} </Text>
                  </View>
                  <View style={{marginLeft: 90}}>
                    <Text style={{fontSize: 20}}> {"0"} </Text>
                  </View>
                  <View style={{marginLeft: 90}}>
                    <Text style={{fontSize: 20}}> {"0"} </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style= {{flexDirection: 'row', marginLeft: 0}}>
              <View style={styles.user_info}>
                <View style= {{flexDirection: 'row'}}>
                  <View style={{marginLeft: 0}}>
                    <Text style={{fontSize: 10}}> {"Posts"} </Text>
                  </View>
                  <View style={{marginLeft: 75}}>
                    <Text style={{fontSize: 10}}> {"Follwers"} </Text>
                  </View>
                  <View style={{marginLeft: 65}}>
                    <Text style={{fontSize: 10}}> {"Following"} </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
    );
};

export default Profile

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  profileImage: {
    marginLeft: 29,
    height: 200,
    width: 200,
    borderRadius: 200/2,
  },
  info: {
    marginTop: 10,
    marginLeft: 2,
    alignSelf: 'center'
  },
  user_info: {

  }
});
