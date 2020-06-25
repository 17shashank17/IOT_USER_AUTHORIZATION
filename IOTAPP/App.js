/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';

// import Portable from './navigation'


// import {
// 	Header,
// 	LearnMoreLinks,
// 	Colors,
// 	DebugInstructions,
// 	ReloadInstructions,
//   } from 'react-native/Libraries/NewAppScreen';


// import Registration from './components/registration/registration';
// import BackgroundImage from './components/background_image/background_image';
// import Error from './components/error/error';
// import LoginUser from './components/login/login'




// class App extends Component{
	
// 	constructor(){
// 		super();
// 		this.state = {
// 			errors : [],
// 		}
// 	}

// 	handleErrors(error){

// 		this.setState({errors : error})

// 	}
// 	render(){
// 		return(
// 			<BackgroundImage>
// 				{/* <Portable></Portable> */}
// 				<Registration getErrors = {this.handleErrors.bind(this)}></Registration>
// 				<Error errors = {this.state.errors}></Error>
// 			</BackgroundImage>
// 		)
// 	}
// }

import React from 'react';

import {createAppContainer} from 'react-navigation'

import {createStackNavigator} from 'react-navigation-stack';

import LoginUser from './components/login/login'
import Home from './components/home/home';
import Profile from './components/profile/profile'
import AddSubject from './components/bunkManager/addSubjects/addSubjects';
import ShowSubject from './components/bunkManager/showSubjects/showSubjects';
import SubjectDetail from './components/bunkManager/subjectDetail/subjectDetail';

const stacknavigator = createStackNavigator({

    home : Home,
    login : LoginUser,
    profile : Profile,
    addSubject: AddSubject,
    showSubject: ShowSubject,
    subjectDetail: SubjectDetail,
    
})
  
  
const App = createAppContainer(stacknavigator);



export default App