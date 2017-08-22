/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet,Button,View,Alert,Image} from 'react-native';
import { Container, Header, Content, CardItem, Body, Text,Thumbnail } from 'native-base'
import { StackNavigator } from "react-navigation";
import { Card,CardImage, CardTitle, CardContent, CardAction} from 'react-native-card-view';

const firebase = require('firebase');

export default class HomeComponent extends Component {
   constructor(props){
    super(props)
     this.state={name:""};
     console.disableYellowBox = true;
     const { navigate } = this.props.navigation;
     
  }


    componentWillMount() {
      var ref =  firebase.database().ref('users/' + firebase.auth().currentUser.uid);
      ref.on('value',(snapshot)=>{
        this.setState({name:snapshot.val().username});
      })
    }

signout(navigate){
  firebase.auth().signOut();
  navigate('Main');
}



  render() {
    const { navigate } = this.props.navigation;
    return (
<Container style={styles.Container}>
        <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
            <Text style={{fontSize:20,left:10}}>Welcome,</Text>
            <Text onPress={() => { this.signout(navigate)}} style={{fontSize:20,right:5, fontWeight: 'bold', color:'#024DFA'}}>Logout</Text>
        </View>
        <Text style={{fontSize:18, fontWeight: 'bold', left:20}}>{this.state.name}</Text>
      <Card style={styles.cardcontent}>
        <CardContent >
              <Thumbnail source={{ uri: 'https://pbs.twimg.com/profile_images/699224502450941953/0KtfaWaX_400x400.jpg' }} 
              style={{top:20}}/>
          <Text style={styles.textcomp}></Text>
        </CardContent>
        <CardAction >
          <Button
            style={styles.button}
            onPress={() => { navigate('Pet')}}
            title="My Pet"
          />
        </CardAction>
      </Card>
      <Card>
        <CardContent style={styles.cardcontent}>
           <Thumbnail source={{ uri: 'https://thumb9.shutterstock.com/display_pic_with_logo/82808/82808,1314530581,2/stock-vector-appointment-icon-office-clock-and-calendar-vector-illustration-83566876.jpg' }} 
              style={{top:20}}/>
          <Text style={styles.textcomp}></Text>
        </CardContent>
        <CardAction >
          <Button
            style={styles.button}
            onPress={() => { navigate('appointment')}}
            title="Book Appointment"
          />
        </CardAction>
      </Card>
      <Card>
        <CardContent style={styles.cardcontent}>
          <Thumbnail source={{ uri: 'http://a677.phobos.apple.com/us/r1000/055/Purple/v4/e3/46/5d/e3465da9-4bef-8587-5673-4e8545c48e91/mzl.mdodhdsj.png' }} 
           style={{top:20}}/>
          <Text style={styles.textcomp}></Text>
        </CardContent>
        <CardAction >
          <Button
            style={styles.button}
            onPress={() => { navigate('reminder')}}
            title="Reminder"
          />
        </CardAction>
      </Card>
</Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   // top:40,
    flex: 1,
  //  justifyContent: 'center',
   // alignItems: 'center',
    backgroundColor: '#fff',
  },
  textcomp:{
   // alignItems:'center'
    top:60,
    fontSize:30,
  },
  cardcontent:{
    //backgroundColor:'#F5F5DC'
    backgroundColor:'#fff'
  },
  button:{
    fontSize:30
  }
});



AppRegistry.registerComponent('HomeComponent', () => HomeComponent);