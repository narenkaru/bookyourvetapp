/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet,Button,View,Alert,Image,TouchableHighlight} from 'react-native';
import { Container, Header, Content, CardItem, Body, Text,Thumbnail } from 'native-base'
import { StackNavigator } from "react-navigation";
import { Card,CardImage, CardTitle, CardContent, CardAction} from 'react-native-card-view';

//call function
import call from 'react-native-phone-call'

export default class ContactComponent extends Component {

  constructor(props){
    super(props)
  }

  callnumber(){
      const args = {
        number: '60340426742', // String value with the number to call 
        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call  
      }

      call(args).catch(console.error)
  }


  render() {
       const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
         <TouchableHighlight onPress={() => {this.callnumber()}}>
              <Image 
                  style={{width: 100, height: 100}}
                  source={{uri:'https://firebasestorage.googleapis.com/v0/b/bookyourvet-6ab87.appspot.com/o/phone_icon.png?alt=media&token=dabb0d32-b22e-45ac-ba1a-048e71de6322'}}
          />
          </TouchableHighlight>
       <Text style={styles.input} onPress={() => {this.callnumber()}}>
          Phone : +603 4042 6742 
      </Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }, 
  input:{
    padding:20,
    fontSize:20,
    fontWeight:"bold"
  }

});



AppRegistry.registerComponent('ContactComponent', () => ContactComponent);