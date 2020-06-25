import React , {Component} from 'react';

import {
    View,
    Text,
    Image,
    AsyncStorage,
} from 'react-native';

import styles from './profile_css'
import BackgroundImage from './../background_image/background_image';
import Logout from './../logout/logout';

import BunkManagerEssentials from './../bunkManager/bunkManager'

export default class Profile extends Component{

    constructor(){
        super(); 
        this.state = {
            username : '',
            firstname: '',
            lastname : '',
            email : '',
            photo : null,
            base64image : null,
        }
    }

    handleProfileData(){
        var data = this.props.navigation.getParam('data');
        var user_detail = JSON.parse(data.user_detail);
        user_detail = user_detail[0]
        var fields = user_detail.fields;
        
        this.state.username = data.username;
        this.state.firstname = fields.firstname;
        this.state.lastname = fields.lastname;
        this.state.email = fields.email;
        this.state.base64image = fields.base64image;

        return 'Profile Information'
    }

    static navigationOptions = {
        headerShown: false,
    }

    render(){
        
        return(
            <BackgroundImage>
                <View style = {styles.container}>
                    <View>
                        <Logout navigation = {this.props.navigation}></Logout>
                    </View>
                    <Text>Welcome To Profile</Text>
                    <Text>{this.handleProfileData()}</Text>
                    <View>
                        <Image 
                            source = {{uri: `data:image/jpg;base64,${this.state.base64image}`}}
                            style = {styles.profile_image}
                        />
                        <Text>Username : {this.state.username}</Text>
                        <Text>Name : {this.state.firstname}  {this.state.lastname}</Text>
                        <Text>Email : {this.state.email}</Text>
                    </View>
                    <View>
                        <BunkManagerEssentials navigation = {this.props.navigation}></BunkManagerEssentials>
                    </View>
                </View>
            </BackgroundImage>
        )
    }
}