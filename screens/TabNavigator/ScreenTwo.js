import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements'

class ScreenTwo extends Component {
    render() {
        return (


    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{flex: 1}}>
                <View style={styles.navBar}>
                    <Text style={styles.nameHeader}>Add Card</Text>
                </View>

                <View style={styles.container}>
                    <CreditCardInput onChange={this._onChange} />
                </View>
                <View > 
                     <Button title="Log out" onPress={() => this.props.screenProps.navigation.navigate('WelcomeScreen')} />
                </View>

            </View>
    </TouchableWithoutFeedback>

        );
    }
}
export default ScreenTwo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navBar: {
    height: 90,
    justifyContent: 'center',
    alignContent: 'center',
  },
    nameHeader: {
    fontSize: 22,
    textAlign: 'center'
  }
});

