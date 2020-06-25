import React, {Component} from 'react';

import {
    View,
    Text,
    TextInput,
    Button,
} from 'react-native';

import BackgroundImage from './../../background_image/background_image';

import styles from './subjectDetail_css';

export default class SubjectDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            no_of_classes_taken: 0,
            no_of_classes_attended: 0,
            subject_name : null,
            message : '',
        }
        this.setVariables()
    }

    add_no_of_classes_attended(value){
        var x = this.state.no_of_classes_attended;
        x+=1;
        this.setState({no_of_classes_attended:x});
    }

    decrease_no_of_classes_attended(){
        this.setState({no_of_classes_attended:this.state.no_of_classes_attended-1})
    }

    add_no_of_classes_taken(){
        this.setState({no_of_classes_taken:this.state.no_of_classes_taken+1})
    }

    decrease_no_of_classes_taken(){
        this.setState({no_of_classes_taken:this.state.no_of_classes_taken-1})
    }

    setVariables(){
        var data = this.props.navigation.getParam('data')
        this.state.no_of_classes_attended = data.fields.no_of_classes_attended;
        this.state.no_of_classes_taken = data.fields.no_of_classes_taken;
        this.state.subject_name = data.fields.subject_name;
    }

    updateAttendence(){

        fetch('http://192.168.43.85:8000/updateattendence/',{
            method : 'post',
            body: JSON.stringify({
                'subject_name':this.state.subject_name,
                'no_of_classes_taken':this.state.no_of_classes_taken,
                'no_of_classes_attended':this.state.no_of_classes_attended
            })
        })
        .then(function(response){
            return response.json()
        })
        .then((data)=>{
            this.setState({message:data.message})
        })
    }

    static navigationOptions = {
        headerShown: false,
    }

    render(){
        return(
            <BackgroundImage>
                <View style={styles.container}>
                    <Text>{this.state.message}</Text>
                    <Text>Subject Name: {this.state.subject_name}</Text>
                    <View style={styles.classes}>
                    <Text style = {styles.text}>Number of classes taken: {this.state.no_of_classes_taken}</Text>
                    <Button title = "+" onPress = {()=> this.add_no_of_classes_taken()} />
                    <Button title = "-" onPress = {()=> this.decrease_no_of_classes_taken()} />
                    </View>
                    <View style = {styles.classes}>
                    <Text style = {styles.text}>Number of classes attended: {this.state.no_of_classes_attended}</Text>
                    <Button style = {styles.btn} title = "+" onPress = {() => this.add_no_of_classes_attended(this.state.no_of_classes_attended)} />
                    <Button style = {styles.btn} title = "-" onPress = {() => this.decrease_no_of_classes_attended()} />
                    </View>
                    <Text style = {styles.text}>Percentage:</Text>
                    <Button 
                        style = {styles.btn_submit} 
                        title = "Update Attendence"
                        onPress = {()=> this.updateAttendence()} 
                    />
                </View>
            </BackgroundImage>
        )
    }
}
