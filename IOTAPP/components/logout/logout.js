import React , {Component} from 'react';

import {
    View,
    Button,
    Text,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

export default class Logout extends Component{

    constructor(){
        super();
    }

    deleteCookie = async () => {
        try {
            await AsyncStorage.removeItem('data');
        } 
        catch (error) {
            console.warn('error occured',error)
        }
    }


    logoutUser(){

        fetch('http://192.168.43.85:8000/logout/',{
            method: "post"
        })
        .then(function(response){
            return response.json()
        })
        .then((data) => {
            this.deleteCookie()
            this.props.navigation.navigate('login',data)
        })
    }

    render(){
        return(
            <TouchableOpacity
                onPress = {() => this.logoutUser() }
            >
                <Text>Logout</Text>
            </TouchableOpacity>
        )
    }
}