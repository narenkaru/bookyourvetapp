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
  Button,Image,Alert
} from 'react-native';
//import HomeComponent from './src/components/home';
import { StackNavigator } from "react-navigation";

export default class PetDetailsComponent extends Component {

constructor(props){
  super(props)
  console.disableYellowBox = true;
  const { navigate } = this.props.navigation;

  var paramsData = this.props.navigation.state.params.data;
  console.log(this.props.navigation.state.params.data)

  this.state={
    name:paramsData.name,
    species:paramsData.species,
    breed:paramsData.breed,
    gender:paramsData.gender,
    birthday:paramsData.birthday,
    otherInfo:paramsData.otherinformation,
    imageUrl:paramsData.imageUrl,
    history: paramsData.treatment,
    id:paramsData.id
  }
}

goTreatment(navigate){
    if(this.state.history){
    navigate('PetTreatmentDetails',{data:this.state.history})
  }else{
    Alert.alert('No treatment History found')
  } 
}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
          <Image
            style={{width: 100, height: 100, margin:20}}
           // source={{uri:this.state.imageUrl?this.state.imageUrl:'https://firebasestorage.googleapis.com/v0/b/bookyourvet-6ab87.appspot.com/o/noimagefound.jpg?alt=media&token=5246688d-b8dc-4370-ac9d-18e2142f17a8'}}
             source={{uri:this.state.imageUrl}}
          />
        <Text style={styles.welcome}>
         Pet species : {this.state.species}
        </Text>
        <Text style={styles.welcome}>
         Pet Name : {this.state.name}
        </Text>
        <Text style={styles.welcome}>
          Breed : {this.state.breed}
        </Text>
        <Text style={styles.welcome}>
          Gender : {this.state.gender}
        </Text>
        <Text style={styles.welcome}>
          Pet D.O.B : {this.state.birthday}
        </Text>
          <Button
            onPress={() =>this.goTreatment(navigate)
            //Alert.alert(this.state.history)
             // navigate('PetTreatmentDetails')
             // navigate('PetTreatmentDetails',{data:this.state.history})
            }
            title="Past Consultation History"
          />
      </View>
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
  welcome: {
    fontSize: 20,
   //textAlign: 'center',
    margin: 10,
  },
});


AppRegistry.registerComponent('PetDetailsComponent', () => PetDetailsComponent);
