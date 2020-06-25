import React, {Component} from 'react';

import {
    View,
    Text,
    TextInput,
    Button,
    AsyncStorage,
} from 'react-native';

import BackgroundImage from './../../background_image/background_image';

import styles from './addSubjects_css';

export default class AddSubject extends Component{

    constructor(){
        super();
        this.state = {
            subjects : [],
            subject : '',
            elements : [],
            element : null,
        }
    }

    static navigationOptions = {
        headerShown: false,
    }

    setCookie = async() => {
        try{
            await AsyncStorage.setItem('subjects',JSON.stringify({'all_subjects':this.state.subjects}))
        }
        catch(error){
            console.warn("error occured",error)
        }
    }

    setSubjects(){
        var arr = this.state.subjects;
        arr.push(this.state.subject);
        this.setState({subjects:arr})
        // this.setState({subject:text})
    }

    handlePress(){
        if (this.state.subject != ''){
            this.setSubjects()
            var arr = this.state.elements;
            arr.push(this.state.element)
            this.setState({elements:arr})
            this.setState({subject:''});
        }
        
    }

    submitData(){
        console.warn("Subjects",this.state.subjects);
        fetch('http://192.168.43.85:8000/addsubject/',{
            method: "post",
            body: JSON.stringify({'subjects':this.state.subjects})
        })
        .then(function(response){
            return response.json()
        })
        .then((data) => {
            console.warn(data)
            // this.setCookie()
        })
    }



    render(){
        this.state.element = 
                <View style = {styles.add_subject} >
                    <TextInput 
                        placeholder = "Add Subject"
                        onChangeText = {(text)=> this.state.subject=text}
                        style = {styles.input_common}
                    />
                    <Button 
                        title = '+'
                        onPress = {() => this.handlePress()}
                        // style = {styles.btn}
                    />
                </View>
        return(
            <BackgroundImage>
                <View style = {styles.container}>
                    {this.state.element}
                    {this.state.elements.map((value)=>{
                        return value;
                    })}
                    <Button 
                        title="Submit"
                        onPress = {()=> this.submitData()}
                    />
                </View>
            </BackgroundImage>
        )
    }
}