/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import HomeComponent from './src/components/home';
import PetComponent from './src/components/pet';
import PetFormComponent from './src/components/petform';
import PetDetailsComponent from './src/components/petdetails';
import PetTreatmentDetailsComponent from './src/components/pettreatmentdetails';
import AppointmentComponent from './src/components/appointment';
import ReminderComponent from './src/components/reminder';
import RegisterComponent from './src/components/registration';
import AboutComponent from './src/components/about';
import ContactComponent from './src/components/contact';

import { StackNavigator } from "react-navigation";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

import { Container, Header, Content, List, ListItem, Thumbnail, Body,Left,Right } from 'native-base';

import getDirections from 'react-native-google-maps-directions'

const firebase = require('firebase');

//firebase
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0RNVuWNJcvqEZAqwudFcVeqxbT2Vp-KI",
    authDomain: "bookyourvet-6ab87.firebaseapp.com",
    databaseURL: "https://bookyourvet-6ab87.firebaseio.com",
    projectId: "bookyourvet-6ab87",
    storageBucket: "bookyourvet-6ab87.appspot.com",
    messagingSenderId: "416942615461"
  };
const firebaseApp = firebase.initializeApp(config);
//const firebase = firebase.initializeApp(config);



export default class BookYourVet extends Component {
    constructor(props){
        super(props)
        const { navigate } = this.props.navigation;
     /*   firebase.auth().onAuthStateChanged((user)=>{
            if (user){
              navigate('Home');
            }
        })*/
         // firebase.auth().signOut();
        this.state = {
          email:'',
          password: '',
          lat:'',
          lng:'',
          s_lat:'',
          s_lng:''
        }
        /*      {this.state.data.map((list)=>{
        return <Text onPress={()=> Alert.alert(list)}>{list}</Text>
        })
        }*/
  }

  handlePress(navigate) {
    if(this.state.email=="" || this.state.email == undefined || this.state.password =="" || this.state.password == undefined){
      if(this.state.email=="" || this.state.email == undefined){
          Alert.alert("Please enter your email");
      }else if(this.state.password =="" || this.state.password == undefined){
          Alert.alert("Please enter your password");
      }
    }else{
     // Alert.alert(this.state.email + " and " + this.state.password);
   firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((authenticatedUser) => {
              navigate('Home')
      }).catch((error)=>{
        Alert.alert("Email or password incorrect");
      })
    } 
}



  componentWillMount(){
    var ref = firebase.database().ref('clinic_location');
    ref.once('value',(snapshot)=>{
        if(snapshot.val()){
            this.setState({
                lat:snapshot.val().lat,
                lng:snapshot.val().lng
            })
        }
    })

      navigator.geolocation.getCurrentPosition(
      (position) => {
          this.setState({
              s_lat:position.coords.latitude,
              s_lng:position.coords.longitude
          })
       // var initialPosition = JSON.stringify(position);
       // this.setState({initialPosition});
      // Alert.alert(position);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
   

      
  }

 handleGetDirections(){
    const data = {
       source: {
        latitude:this.state.s_lat,
        longitude: this.state.s_lng
      },
      destination: {
        latitude: this.state.lat,
        longitude: this.state.lng
      },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }
 
    getDirections(data)
  }



  render() {
    const { navigate } = this.props.navigation;
         return (
             <ScrollView style={styles.scroll}>
              <View style={styles.container}>
                      <Image 
                          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/bookyourvet-6ab87.appspot.com/o/logo.png?alt=media&token=cf96ad14-7225-4b99-b38c-ce92b1cbde2c' }}
                          //style={{width: 200, height: 70}} 
                            style={styles.logo}
                          />
  
                      <TextInput style={styles.email}
                          placeholder="Enter your email"
                          returnKeyLabel = {"next"}
                          onChangeText={(text) => this.setState({email:text})}
                      />
                      <TextInput style={styles.password}
                          placeholder="Enter your password"
                          returnKeyLabel = {"next"}
                          onChangeText={(text) => this.setState({password:text})}
                      />
                  <View style={{flex: 1, flexDirection: 'row', top:20}}>
                      <Button backgroundColor="#FF0000" raised={true} style={{width: 100, height: 50}}
                          onPress={() =>{

                            /*    var ref = firebase.database().ref('users');
                                ref.once("value").then(function(snapshot) {
                            //     snapshot.forEach(function(childSnapshot) {
                              if(snapshot.val()){
                                      Alert.alert(
                                        'Alert Title',
                                        'My Alert Msg',
                                        { cancelable: false }
                                      )
                              }
                                // });
                                });*/
                              // navigate('Home')
                          this.handlePress(navigate)
                          }}title="LOGIN"
                      />
                      <Button style={{width: 100, height: 50, top:20, backgroundColor: 'steelblue'}}
                          onPress={() => navigate('register')}
                          title="SIGN UP"
                      />
                  </View>





                  <View style={{flex: 1, flexDirection: 'row', top:180}}>
                      <Button backgroundColor="#FF0000" raised={true} style={{width: 100, height: 50, padding:10}}
                          onPress={() =>{
                          navigate('about');
                          }}title="About us"
                      />
                      <Button backgroundColor="#FF0000" raised={true} style={{width: 100, height: 50, padding:10}}
                          onPress={() => navigate('contact')}
                          title="Contact"
                      />
                     <Button backgroundColor="#FF0000" raised={true} style={{width: 100, height: 50, padding:10}}
                          // onPress={this.handleGetDirections()}
                          onPress={() =>{
                          this.handleGetDirections()
                          }}
                          title="Location"
                      />
                  </View>










              </View>

                  
              </ScrollView>
          );

    }
}




const styles = StyleSheet.create({
    scroll:{
    //  backgroundColor: '#F0F8FF',
    backgroundColor:'#F0F8FF'
        },
    container: {

      flex: 1,
     // justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor: '#F5FCFF',
      top:160
    },
    logo:{
       bottom: 50,
      width: 200, 
      height: 70

    },
    welcome: {
      bottom: 100,
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    email:{
      padding:10,
      bottom: 10,
      width: 300,
      backgroundColor: '#F5F5DC'
    },
    password:{
      padding:10,
      width: 300,
      backgroundColor: '#F5F5DC'
    },
    submit:{
      color:'#F0F8FF'
    }
});




const SimpleApp = StackNavigator({
  Main: { screen: BookYourVet },
  Home: { screen: HomeComponent },
  Pet: { screen: PetComponent },
  PetForm: { screen: PetFormComponent },
  PetDetails: { screen: PetDetailsComponent },
  PetTreatmentDetails: { screen: PetTreatmentDetailsComponent },
  appointment: { screen: AppointmentComponent },
  reminder: { screen: ReminderComponent },
  register: { screen: RegisterComponent },
  about: { screen: AboutComponent },
  contact: { screen : ContactComponent}
});

AppRegistry.registerComponent('BookYourVet', () => SimpleApp);
