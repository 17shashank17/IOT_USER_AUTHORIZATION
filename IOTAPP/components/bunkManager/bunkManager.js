import React ,{Component} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

export default class BunkManagerEssentials extends Component{

    constructor(){
        super();
        this.state = {

        }
        // this.retrieveCookie()
    }

    retrieveCookie = async() => {
        console.warn("In retrieve cookie")
        try{
            const value = AsyncStorage.getItem('subjects');
            console.warn('Value found',value)
            if (value != null){
                return value;
            }
        }
        catch(error){
            console.warn("Error occured in retrieving",error)
        }
    }

    handlePress(){

        // const value = this.retrieveCookie()
        // if (value != null){
        //     this.props.navigation.navigate('showSubject')
        // }
        // else{
        //     this.props.navigation.navigate('addSubject')
        // }

        fetch('http://192.168.43.85:8000/getsubject',{
            method: "get",
        })
        .then(function(response){
            return response.json()
        })
        .then((data) => {
            var subjects_data = JSON.parse(data.subjects_detail)
            if (subjects_data.length > 0)
                this.props.navigation.navigate('showSubject',{'data':subjects_data})
            else
                this.props.navigation.navigate('addSubject')
        })


    }

    render(){
        return(
            <View>
                <TouchableOpacity
                    onPress = {()=> this.handlePress()}
                >
                    <Text>Bunk Manager</Text>
                </TouchableOpacity>
            </View>
        )
    }
}