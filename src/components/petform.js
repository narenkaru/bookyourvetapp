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
  TextInput,div,Alert,Image, TouchableOpacity
} from 'react-native';
import { Platform} from 'react-native';
//import HomeComponent from './src/components/home';
import { StackNavigator } from "react-navigation";
import { Container,Content } from 'native-base';
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import fs from 'react-native-fs';
const firebase = require('firebase');

//import ImagePicker from 'react-native-image-picker';

var RNGRP = require('react-native-get-real-path');

//const storage = firebase.storage();
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, mime = 'application/octet-stream') => {
  console.log("uri: " + uri);
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      const sessionId = new Date().getTime()
      console.log("session is: " + sessionId);
      let uploadBlob = null
      const imageRef = firebase.storage().ref('images').child(`${sessionId}`)

      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        console.log("data: " + data);
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        console.log("blob: " + blob);
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        console.log("successfull");
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}






export default class PetFormComponent extends Component {
    constructor(props){
      super(props)
      console.disableYellowBox = true;
      this.state = {
          name:null,
          species:null,
          breed:null,
          birthday:null,
          gender:null,
          otherInformation:null,
          avatarSource: null,
          uploadURL:null
      }
        

    }


  _pickImage() {
    this.setState({ uploadURL: '' })
    ImagePicker.launchImageLibrary({}, response  => {
      console.log(response.uri);

  /*    if(Platform.OS === 'ios'){
        uploadImage(response.uri)
          .then(url => this.setState({ uploadURL: url }))
          .catch(error => console.log(error))
      }else{
            RNGRP.getRealPathFromURI(response.uri).then(filePath =>
                  uploadImage(filePath)
                    .then(url => this.setState({ uploadURL: url }))
                    .catch(error => console.log(error))
           );

      }
          */
      if(Platform.OS === 'android'){
          RNGRP.getRealPathFromURI(response.uri).then(filePath =>
                uploadImage(filePath)
                  .then(url => this.setState({ uploadURL: url }))
                  .catch(error => console.log(error))
          );
      }else{
        uploadImage(response.uri)
          .then(url => this.setState({ uploadURL: url }))
          .catch(error => console.log(error))

      }



    })
 
  }





  submitdetails(navigate){
   // Alert.alert(this.state);
    if(this.state.name == "" || this.state.species =="" || this.state.breed =="", this.state.gender=="" || this.state.birthday == "" 
    || this.state.otherInformation =="" || this.state.name == undefined || this.state.species == undefined 
    || this.state.breed ==undefined, this.state.gender==undefined || this.state.birthday == undefined ||
     this.state.otherInformation ==undefined || this.state.uploadURL == "" || this.state.uploadURL == undefined) { 

          if(this.state.name == "" ||this.state.name == undefined){
              Alert.alert("Please enter pet name");
          }else if(this.state.species == "" ||this.state.species == undefined){
              Alert.alert("Please enter pet species");
          }else if(this.state.breed == "" ||this.state.breed == undefined){
              Alert.alert("Please enter pet breed");
          }else if(this.state.gender == "" ||this.state.gender == undefined){
              Alert.alert("Please enter pet gender");
          }else if(this.state.birthday == "" ||this.state.birthday == undefined){
              Alert.alert("Please enter pet birthday");
          }else if(this.state.otherInformation == "" ||this.state.otherInformation == undefined){
              Alert.alert("Please enter otherInformation");
          }else if(this.state.uploadURL == "" ||this.state.uploadURL == undefined){
              Alert.alert("Please upload your pet's image");
          }
     }else{
       let data = {
         name:this.state.name,
         species:this.state.species,
         breed:this.state.breed,
         gender:this.state.gender,
         birthday:this.state.birthday,
         otherinformation:this.state.otherInformation,
         imageUrl:this.state.uploadURL
       }
       let petdata = {
         name:this.state.name,
         species:this.state.species,
         breed:this.state.breed,
         gender:this.state.gender,
         birthday:this.state.birthday,
         otherinformation:this.state.otherInformation,
         userId:firebase.auth().currentUser.uid,
         imageUrl:this.state.uploadURL
       }
        var checkRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
        var Ref = firebase.database().ref('/pets/');
        checkRef.once("value").then(function(snapshot) {
            if(snapshot.val()){
              if(snapshot.val().pets){
                var allpets = snapshot.val().pets;
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/' + allpets.length).set(data);
              }else{
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/0/').set(data);
              }
            }
        });
        Ref.once("value").then(function(snap1) {
            if(snap1.val()){
                var petsall = snap1.val();
                firebase.database().ref('/pets/' + petsall.length).set(petdata);
            }else{
                firebase.database().ref('/pets/0/').set(petdata);
            }
        });


    //   firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/').push(data);
     //  firebase.database().ref('/pets/').push(petdata);
       
         navigate('Pet');
     }



  }




  render() {
    const { navigate } = this.props.navigation;
    return (
    //  <Container style={styles.content}>
     //   <Content style={styles.content}>
     <ScrollView  style={styles.viewscroll}>
      <View style={styles.container}>
        <TouchableOpacity onPress={ () => this._pickImage() }>
            <Image
              style={{width: 100, height: 100, margin:20}}
              source={{uri: this.state.uploadURL?this.state.uploadURL:"https://firebasestorage.googleapis.com/v0/b/bookyourvet-6ab87.appspot.com/o/addimg1.png?alt=media&token=9524e2d5-b8c6-401e-8321-6fc59c1669e2"}}
            />
        </TouchableOpacity>




            <TextInput style={styles.name}
                underlineColorAndroid='transparent'
                placeholder="Enter your Pet name"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({name:text})}
            />
            <TextInput style={styles.name}
                underlineColorAndroid='transparent'
                placeholder="Enter your Pet Species"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({species:text})}
            />
            <TextInput style={styles.name}
                underlineColorAndroid='transparent'
                placeholder="Enter your Pet Breed"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({breed:text})}
            />
            <TextInput style={styles.name}
                underlineColorAndroid='transparent'
                placeholder="Enter your Pet Gender"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({gender:text})}
            />
            <TextInput style={styles.name}
                underlineColorAndroid='transparent'
                placeholder="Enter Pet's D.O.B"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({birthday:text})}
            />
            <TextInput style={styles.name}
                underlineColorAndroid='transparent'
                placeholder="Other Information"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({otherInformation:text})}
            />
            <View style={{flex: 1, flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                    <Text style={{color: 'blue',margin:20, fontSize:18, fontWeight:'bold'}}
                        onPress={() =>this.submitdetails(navigate)
                          //navigate('PetTreatmentDetails')
                          }>
                        SAVE
                    </Text>
                    <Text style={{color: 'blue',margin:20, fontSize:18, fontWeight:'bold'}}
                        onPress={() => navigate('Pet')}>
                        CANCEL
                    </Text>
            </View>
      </View>
       </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  viewscroll:{backgroundColor: '#fff',},
  content:{
  backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  },
  name:{
    padding:10, marginBottom:10, width: 300,
    borderWidth: 1
  }
});


AppRegistry.registerComponent('PetFormComponent', () => PetFormComponent);
