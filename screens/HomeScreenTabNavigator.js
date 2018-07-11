import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ScreenOne from './TabNavigator/ScreenOne'
import ScreenTwo from './TabNavigator/ScreenTwo'


export default class AppTabNavigator extends Component {

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         headerLeft: (
    //             <View style={{ padding: 10 }}>
    //                 <Ionicons name="md-menu" size={24} onPress={() => navigation.navigate('DrawerOpen')} />
    //             </View>
    //         )
    //     }
    // }
    render() {
        return (
            <HomeScreenTabNavigator screenProps={{ navigation: this.props.navigation }} />
        )
    }
}

const HomeScreenTabNavigator = new TabNavigator({
    ScreenOne: {
        screen: ScreenOne,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: () => (
                <Ionicons name="md-home" size={24} />
            )
        }
    },
    ScreenTwo: {
        screen: ScreenTwo,
        navigationOptions: {
            tabBarLabel: 'Account',
            tabBarIcon: () => (
                <Ionicons name="md-contact" size={24} />
            )
        }
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});