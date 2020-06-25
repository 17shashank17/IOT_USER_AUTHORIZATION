import React , {Component} from 'react'

import {
    Text,
    View,
    AsyncStorage,
    Button,
    TouchableOpacity,
} from 'react-native';
import BackgroundImage from './../../background_image/background_image';

export default class ShowSubject extends Component {

    constructor(){
        super();
        this.state = {

        }
        // this.retrieveCookie();
    }

    static navigationOptions = {
        headerShown: false,
    }

    // retrieveCookie = async() => {
    //     try{
    //         const value = await AsyncStorage.getItem('subjects')
    //         console.warn(value)
    //         var parsed_value = JSON.parse(value);
    //         console.warn("Parsed Value",parsed_value)
    //     }
    //     catch(error){
    //         console.warn("error occured",error)
    //     }
    // }

    handleAttendencePercentage(subject_data){

        if(subject_data.fields.no_of_classes_attended==0 && subject_data.fields.no_of_classes_taken==0)
            return "No Classes taken yet!";
        else{
            return (parseInt(subject_data.fields.no_of_classes_attended)/parseInt(subject_data.no_of_classes_taken))*100;
        }
        
    }

    render(){
        return(
            <BackgroundImage>
                <View>
                    <Text>Subject</Text>
                        {this.props.navigation.getParam('data').map((subject_data)=>{
                            return(
                                <TouchableOpacity
                                    onPress = {() => this.props.navigation.navigate('subjectDetail',{'data':subject_data})}
                                >
                                    <View>
                                        <Text>Subject: {subject_data.fields.subject_name}</Text>
                                        <Text>Attendence Percentage: {this.handleAttendencePercentage(subject_data)}</Text>
                                    </View>    
                                </TouchableOpacity>
                            )
                        })}
                        <Button title = "Add More Subjects" onPress = {()=> this.props.navigation.navigate('addSubject')}/>
                </View>
            </BackgroundImage>
        )
    }
} 