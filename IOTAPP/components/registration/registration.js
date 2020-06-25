import React, {Component} from 'react';
import {

  TextInput,
  View,
  Text,
  Button,
  Switch,

} from 'react-native';

import ProfileImageUploader from './../profile_image_uploader/profile_image_uploader';

import styles from './registration_style';

import ImgToBase64 from 'react-native-image-base64';

import Spinner from 'react-native-loading-spinner-overlay';



export default class Registration extends Component{

    constructor(){
        super();
        this.state = {
            username : '',
            password : '',
            conf_password : '',
            firstname : '',
            lastname : '',
            email : '',
            gender : 'M',
            photo : null,
            base64image:'',
            spinner : false,
        }
    }

    validateData(){

        var errors = []
        var regx_user = /^[a-zA-Z0-9_]{3,15}$/;
        var regx_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.conf_password != this.state.password || this.state.password.length<8)
            errors.push({'PasswordError' : 'Password Do Not Matches or Password length is less than 8'});
        if (regx_user.test(this.state.username)==false)
            errors.push({'UsernameError' : 'Username Dose Not Follow Specified Constraints'});
        if (regx_email.test(this.state.email)==false)
            errors.push({'EmailError' : 'Email address is wrong'});
        if (this.state.username=='' || this.state.password == '' || this.state.firstname == '' || this.state.email == '')
            errors.push({'BlankField' : 'Username, Password, Firstname, Email cannot be left blank'})

        return errors;
    }

    convertImageToBase64(){
        ImgToBase64.getBase64String('file://'+this.state.photo.path)
            .then(base64String => this.setState({base64image:base64String},()=> this.sendDataToBackend()))
            .catch(err => console.warn(err))   
    }

    sendDataToBackend(){
        const formdata = new FormData();
        for ( var key in this.state){
            formdata.append(key,this.state[key]);
        }
        fetch('http://192.168.43.85:8000/register/',{
            method: 'post',
            body: JSON.stringify(formdata),
        })
        .then(function(response){
            return response.json()
        })
        .then((data) => {
            console.warn(data)
            this.setState({spinner:false})
            // Portable.navigator.navigate('login');
            if (data.message)
                this.props.navigation.navigate('profile',{'data':data})
            else
                this.props.navigation.navigate('signup',{'message':'Username already exists'})
        })
    }

    registerUser(){
        this.setState({spinner: true})
        var error = this.validateData();
        
        if (error.length>0){
            this.setState({spinner:false})
            this.props.getErrors(error)
        }
        else{
            this.convertImageToBase64()
        }
        
    }

    handleImage(image){
        this.state.photo = image;
    }

    render(){
        return(
            <View style = {styles.container}>

                <View style = {styles.header_text}>
                    <Text>Register Yourself</Text>
                    <Text>{this.props.navigation.getParam('message')}</Text>
                </View>

                <View style = {styles.name_input}>
                    <TextInput 
                        placeholder = "First Name"
                        style={styles.input_common} 
                        onChangeText = {(text) =>  this.setState( {firstname: text } )} 
                    />
                    <TextInput 
                        placeholder = 'Last Name'
                        style = {styles.input_common} 
                        onChangeText = {(text)=> this.setState({lastname:text})}
                    />
                </View>

                <View>
                    <TextInput 
                        placeholder = 'Username'
                        style = {styles.input_common} 
                        onChangeText = {(text)=> this.setState({username:text})}
                    />
                    <TextInput 
                        placeholder = 'Password'
                        style = {styles.input_common} 
                        secureTextEntry = {true}
                        onChangeText = {(text)=> this.setState({password:text})}  
                    />
                    <TextInput 
                        placeholder = 'Confirm Password'
                        style = {styles.input_common}
                        secureTextEntry = {true}
                        onChangeText = {(text)=> this.setState({conf_password:text})}
                        />
                    <TextInput 
                        placeholder = 'Email Address'
                        style = {styles.input_common} 
                        onChangeText = {(text)=> this.setState({email:text})}
                    />
                    <Spinner
                        visible = {this.state.spinner}
                    />
                    <ProfileImageUploader handleImage = {this.handleImage.bind(this)}></ProfileImageUploader>
                </View>

                <View style = {styles.switch_style}>
                    <Text>Male</Text>
                    <Switch
                        value = {this.state.gender}
                        onValueChange = {(text)=> this.setState({gender: text})}
                    />
                    <Text>Female</Text>
                </View>

                <View style={styles.navigate_to_login}>
                    <Text onPress={()=> this.props.navigation.navigate('login')}>
                        Already have an account?
                    </Text>
                </View>

                <Button 
                    title="Register"
                    onPress = {this.registerUser.bind(this)}
                />

            </View>
        )
    }
}