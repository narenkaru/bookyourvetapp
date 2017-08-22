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
  TextInput, Alert
} from 'react-native';
import { StackNavigator } from "react-navigation";
import { Container, Header, Content, List, ListItem, Thumbnail, Body,Left,Right } from 'native-base';
const firebase = require('firebase');

export default class RegisterComponent extends Component {

    constructor(props){
        super(props)
        console.disableYellowBox = true;
        const { navigate } = this.props.navigation;
        
        this.state = {
            name:'',
            hpNumber:'',
            icNubmer:'',
            address:'',
            email: '',
            userName:'',
            password: '',
        }
    }

   registerFunction(navigate){

        if(this.state.name == "" || this.state.hpNumber=="" ||this.state.icNubmer =="" || this.state.address==""||
                this.state.email =="" || this.state.userName =="" || this.state.password == "" || 
                this.state.name == undefined || this.state.hpNumber==undefined ||this.state.icNubmer ==undefined || 
                this.state.address==undefined||
                this.state.email ==undefined || this.state.userName ==undefined || this.state.password == undefined){

                    if(this.state.name == "" || this.state.name == undefined){
                        Alert.alert( 'Please enter your name');
                    }else if(this.state.hpNumber == "" || this.state.hpNumber == undefined){
                        Alert.alert( 'Please enter your HP number');
                    }else if(this.state.icNubmer == "" || this.state.icNubmer == undefined){
                        Alert.alert( 'Please enter your IC number');
                    }else if(this.state.address == "" || this.state.address == undefined){
                        Alert.alert( 'Please enter your Address details');
                    }else if(this.state.email == "" || this.state.email == undefined){
                        Alert.alert( 'Please enter your Valid email');
                    }else if(this.state.userName == "" || this.state.userName == undefined){
                        Alert.alert( 'Please enter your username');
                    }else if(this.state.password == "" || this.state.password == undefined){
                        Alert.alert( 'Please enter your password');
                    }

        }else{  
            let userData={
                name:this.state.name,
                email:this.state.email,
                hp_no:this.state.hpNumber,
                ic_no:this.state.icNubmer,
                address:this.state.address,
                username:this.state.userName,
                type:"user"  
            }
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((newUser) => {
                    firebase.database().ref('users').child(newUser.uid).set(userData);
                   // navigate('Main');
            });
        }   


   } 


 render() {
   const { navigate } = this.props.navigation;
        return (
            
            //<ScrollView style={styles.scroll}>
            <Container style={styles.scroll}>
            <View style={styles.container}>
                    <Text style={styles.welcome}>
                        Signup
                    </Text>
                    <TextInput style={styles.name}
                        underlineColorAndroid='transparent'
                        placeholder="Enter your Name"
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({name:text})}
                    />
                    <TextInput style={styles.hpNumber}
                        underlineColorAndroid='transparent'
                        placeholder="Enter your HP number"
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({hpNumber:text})}
                    />
                    <TextInput style={styles.icNubmer}
                        underlineColorAndroid='transparent'
                        placeholder="Enter your IC number"
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({icNubmer:text})}
                    />
                    <TextInput style={styles.address}
                        underlineColorAndroid='transparent'
                        multiline={true}
                        placeholder="Enter your address"
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({address:text})}
                    />
                    <TextInput style={styles.email}
                        underlineColorAndroid='transparent'
                        placeholder="Enter your email"
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({email:text})}
                    />
                    <TextInput style={styles.userName}
                        underlineColorAndroid='transparent'
                        placeholder="Enter your user name"
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({userName:text})}
                    />
                    <TextInput style={styles.password}
                        underlineColorAndroid='transparent'
                        placeholder="Enter your password"
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({password:text})}
                    />
                    <Button style={{width: 100, backgroundColor: 'steelblue'}}
                        onPress={() =>{
                           // navigate('Home')
                           this.registerFunction(navigate);
                         /*     var ref = firebase.database().ref('users');
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

                        }
                        } //console.log(this.state)}
                        title="SIGN UP"
                    />
                </View>

                </Container>


        );
  }
}

const styles = StyleSheet.create({
    scroll:{
     // backgroundColor: '#F0F8FF',
     backgroundColor:'#fff'
        },
    container: {

      flex: 1,
     // justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor: '#F5FCFF',
      top:20
    },
    welcome: { fontSize: 24,fontWeight:'bold',color:'#000', bottom:10, marginBottom:10, textAlign: 'center', },
    name:{padding:5, marginBottom:5, width: 300, backgroundColor: '#fff',borderWidth: 1 },
    hpNumber:{padding:5, marginBottom:5, width: 300, backgroundColor: '#fff' ,borderWidth: 1},
    icNubmer:{padding:5, marginBottom:5, width: 300, backgroundColor: '#fff',borderWidth: 1 },
    address:{padding:5, marginBottom:5, width: 300, backgroundColor: '#fff',borderWidth: 1 },
    email:{padding:5, marginBottom:5, width: 300, backgroundColor: '#fff',borderWidth: 1 },
    userName:{padding:5, marginBottom:5, width: 300, backgroundColor: '#fff',borderWidth: 1 },

    password:{padding:5, marginBottom:5, width: 300, backgroundColor: '#fff',borderWidth: 1 },
    submit:{ top:20,color:'#fff' }
});

AppRegistry.registerComponent('RegisterComponent', () => RegisterComponent);


