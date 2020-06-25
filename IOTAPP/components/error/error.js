import React, {Component} from 'react';

import {
    View,
    Text,
} from 'react-native';

import styles from './error_css';


export default class Error extends Component{

    constructor(){
        super();
    }

    show_error(item){

        var keys = Object.keys(item)
        return keys.toString() + ' : ' + item[keys]
    }

    render(){

        return(
            <View style={styles.container}>
                {this.props.errors.map((item) => {
                    return(
                        <Text>{this.show_error(item)}</Text>
                    )

                })}
            </View>
        )
    }
}