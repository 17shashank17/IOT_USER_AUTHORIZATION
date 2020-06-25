import React, {Component} from 'react';
import {

  ImageBackground,
  Text,
  View,

} from 'react-native';

import styles from './background_image_css'

export default class BackgroundImage extends Component{
    
    constructor(){
        super();
    }

    render(){
        return(
            <ImageBackground 
                source = {require('./../../static/images/background1.jpg')} 
                style = {styles.backgroundImage}
                >
                {/* <Text>{this.props.children}</Text> */}
                {this.props.children}
            </ImageBackground>

        )
    }
}