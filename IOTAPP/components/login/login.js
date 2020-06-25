import React, {Component} from 'react';

import {
    View,
    Text,
    TextInput,
    Button,
    AsyncStorage,
} from 'react-native';

import ProfileImageUploader from './../profile_image_uploader/profile_image_uploader';

import styles from './login_css'

import BackgroundImage from './../background_image/background_image';

import Spinner from 'react-native-loading-spinner-overlay';

export default class LoginUser extends Component{

    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            spinner: false,
            photo: null
        }
    }

    createCookie = async () => {
        try {
            await AsyncStorage.setItem('data', JSON.stringify({'username':this.state.username,'password':this.state.password}));
        } 
        catch (error) {
            console.warn('error occured',error)
        }
    };

    loginUser(){
        this.setState({spinner:true})
        fetch('http://192.168.43.85:8000/login/',{
            method: 'post',
            body: JSON.stringify({'username':this.state.username,'password':this.state.password})
        })
        .then(function(response) {
            return response.json()
        })
        .then((data)=>{ 
            this.setState({spinner:false})
            if (data.message){
                this.createCookie()
                this.props.navigation.navigate('profile',{'data':data})
            }
            else
                this.props.navigation.navigate('login',{'message':'Wrong Credentials'})
        });
            
    }

    static navigationOptions = {
        headerShown: false,
    }

    handleImage(image){
        this.state.photo = image;
    }

    render(){
        return(
            <BackgroundImage>
            <View style = {styles.container}>
                <Text>Open door by capturing image</Text>
                <ProfileImageUploader handleImage = {this.handleImage.bind(this)}></ProfileImageUploader>
                <Text>Welcome to login</Text>
                <Text>{this.props.navigation.getParam('message')}</Text>
                <TextInput 
                    style = {styles.input_common}
                    placeholder = 'Username or Email' 
                    onChangeText = {(text)=> this.setState({'username':text})}
                />

                <Spinner
                    visible = {this.state.spinner}
                />

                <TextInput 
                    style = {styles.input_common}
                    placeholder = 'Password'
                    secureTextEntry = {true}
                    onChangeText = {(text) => this.setState({'password':text})}
                />
                <View style = {styles.link_options}>
                    <Text onPress = {()=> this.props.navigation.navigate('home')}>New User?</Text>
                    <Text>Forgot Password?</Text>
                </View>
                <Button 
                    title = "Login"
                    onPress = {() => this.loginUser()}
                />
            </View>
            </BackgroundImage>
        )
    }
}