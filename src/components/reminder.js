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
  Button,TextInput,ScrollView,Alert
} from 'react-native';
//import HomeComponent from './src/components/home';
import { StackNavigator } from "react-navigation";
import { Container, Header, Title, Content, Icon,Card, CardItem, Right, Body, Left, Picker, Form, Item as FormItem } from "native-base";
const firebase = require('firebase');

export default class ReminderComponent extends Component {

constructor(props){
  super(props)
  console.disableYellowBox = true;
  this.state={data:""}
}


  componentWillMount(){
    var obj = {
        date:"",
        prefferDoctor:"",
        name:""
    }
    var ref = firebase.database().ref('users/'+ firebase.auth().currentUser.uid + '/appointments/');
    ref.on('value',(snapshot)=>{
      if(snapshot.val()){
        var appoints = snapshot.val();
        obj = appoints[appoints.length - 1];
        this.setState({data:obj});
      }else{
        this.setState({data:obj});
      }
    })
      
  }



  render() {
    const { navigate } = this.props.navigation;
      return (
            <Container style={styles.container}>
              
              <Text style={styles.welcome}>
              Next Follow Up 
              </Text>
              <View>
                  <View style={{flexDirection:'row'}}>
                      <Text  style={styles.input}>
                          Date time: 
                      </Text>
                      <Text style={styles.input}>{ this.state.data.date} { this.state.data.time}</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                      <Text  style={styles.input}>
                          Doctor Name :
                      </Text>
                      <Text style={styles.input}>{ this.state.data.prefferDoctor}</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                      <Text  style={styles.input}>
                          Pet Name : 
                      </Text>
                      <Text style={styles.input}>{ this.state.data.name}</Text>
                  </View>

              </View>
            </Container>
      );
    


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    top:150,
    fontWeight: 'bold'
  },
  name:{
    top:100,
    textAlign: 'center',
    margin: 10,
  },
  input:{
    fontSize:20,
    margin:8,
    top:170,
    fontWeight: 'bold'
  }

});


AppRegistry.registerComponent('ReminderComponent', () => ReminderComponent);
