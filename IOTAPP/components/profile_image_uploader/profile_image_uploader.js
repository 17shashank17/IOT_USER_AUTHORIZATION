import React , {Component} from 'react';

import {
    Image,
    View,
    Button,
} from 'react-native';

import styles from './profile_image_uploader_css';

import ImagePicker from 'react-native-image-picker';



export default class ProfileImageUploader extends Component{

    constructor(){
        super();
        this.state = {
            photo : null,
        }
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                this.setState({ photo: response })
                this.props.handleImage(response);
                
            }
        })
    }

    render(){
        const {photo} = this.state;

        return(
            <View style = {styles.container}>
                {photo && (
                <Image
                    source = {{uri : photo.uri}}
                    style = {styles.image_style}
                />
                )}
                <Button 
                    title = "Upload Image"
                    onPress={this.handleChoosePhoto}
                    style = {styles.btn}
                />
            </View>
        )
    }
}