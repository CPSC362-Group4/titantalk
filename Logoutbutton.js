//React Native Button

//import React in our code
import React from 'react';

//import all the components we are going to use
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

const Logout = () => {
    const onPressLearnMore = () => {
        //For generating alert on buttton click
        alert('Logged out successfully');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* enclose all components in this View tag /}
            <View style={styles.container}>
                <Text>Are you sure? you want to logout</Text>
                {/ Button whith handler function named onPressLearnMore*/}
                <Button
                    onPress={onPressLearnMore}
                    title="Logout"
                    color="#FF5F1F"
                />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default Logout;
