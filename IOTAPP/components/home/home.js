import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';



import {
	Header,
	LearnMoreLinks,
	Colors,
	DebugInstructions,
	ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';


import Registration from './../registration/registration';
import BackgroundImage from './../background_image/background_image';
import Error from './../error/error';
import LoginUser from '../login/login';


class Home extends Component{
	
	constructor(){
		super();
		this.state = {
			errors : [],
		}
		this.retrieveCookie()
	}

	loginUser(value){

		fetch('http://192.168.43.85:8000/login',{
			method: "post",
			body: value,
		})
		.then(function(response){
			return response.json()
		})
		.then((data)=>{ 
            if (data.message){
                this.props.navigation.navigate('profile',{'data':data})
            }
            else
                this.props.navigation.navigate('login',{'message':'Wrong Credentials'})
        });
	}

	retrieveCookie = async () => {
		try {
		  	const value = await AsyncStorage.getItem('data');
		  	if (value !== null) {
				console.warn('Unparsed value',value);
				var data = JSON.parse(value)
				console.warn('Parsed',data)
				this.loginUser(value)
		  	}
		} 
		catch (error) {
		  	console.warn("Error occured",errpr)
		}
	}

	handleErrors(error){

		this.setState({errors : error})

    }
    
    static navigationOptions = {
        headerShown: false,
    }
	render(){
		return(
			<BackgroundImage>
				<Registration navigation = {this.props.navigation} getErrors = {this.handleErrors.bind(this)}></Registration>
				<Error errors = {this.state.errors}></Error>
			</BackgroundImage>
		)
	}
}


export default Home;