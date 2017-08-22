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
  Button,Image, Alert
} from 'react-native';
//import HomeComponent from './src/components/home';
import { StackNavigator } from "react-navigation";
import FAB from 'react-native-fab'
import { Container, Header, Content, List, ListItem, Thumbnail, Body,Left,Right } from 'native-base';
const firebase = require('firebase');


export default class PetComponent extends Component {
  constructor(props){
    super(props)
     this.state={allData:[]};
     console.disableYellowBox = true;
  /*  return (
      <View key={list.name}>
        <Text>{list.name}</Text>
      </View>
    )*/
  }


    componentWillMount() {
       var ref =  firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/');
    ref.on('value',(snapshot)=>{

      if(snapshot.val()){
          datas=[];
          var dataall = snapshot.val();
        //  var datas = snapshot.val();
        for(var i=0; i<dataall.length; i++){
          var odata={};
          odata=dataall[i];
          odata.id=i;
          datas.push(odata);
        }
    
    
          this.setState({allData:datas});
        //  console.log( "line1 : " + allData);
        // this.loadData();
          console.log("1st 2nd : " + this.state.allData)
      }


    })
  }

pageChange(navigate, list){
  navigate('PetDetails',{data:list})
 //Alert.alert(list.id);
}

deletePet(id){
    var ref =  firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/');
    ref.once('value',(snaoData)=>{
        if(snaoData.val()){
            var animals = snaoData.val();

            if(animals.length == 1){
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets').remove();
            }else if((animals.length-1) == id){
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/' + (animals.length-1)).remove();
            }else{
                for(j=id+1; j<animals.length; j++){
                    var orI = j-1;
                    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/' + orI).set(animals[j]);
                }
                  firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/' + (animals.length-1)).remove();
            }

        }
    });
}



  render() {

    const { navigate } = this.props.navigation;
   if(this.state.allData == [] || this.state.allData == "" || this.state.allData == undefined){
      return (
              <Container>
                      <Content>
                          <Text>No Pets Added</Text>

                      </Content>

                      <FAB buttonColor="red" iconTextColor="#fff" buttonColor="#024DFA" onClickAction={() => {navigate('PetForm')}} visible={true} />
              </Container>
          
        );
    }
    else{

        return (
              <Container style={{backgroundColor:'#fff'}}>
                      <Content>
                          
                        <List>
                          {this.state.allData.map((list, index)=>{
                              return (
                              <ListItem avatar style={styles.avatar} onPress={ () => {
                                
                                this.pageChange(navigate, list) 
                                }}>
                                <Left>
                                  <Thumbnail source={{ uri:list.imageUrl?list.imageUrl: 'https://pbs.twimg.com/profile_images/699224502450941953/0KtfaWaX_400x400.jpg' }} />
                                </Left>
                                <Body >
                                  <Text style={{color:'#000', fontSize:18}}>{list.name}</Text>
                                </Body>
                                <Text style={{fontWeight:'bold', color:'#ff3333', fontSize:16}} onPress={ () => { this.deletePet(list.id)}}>Delete</Text>
                              </ListItem>
                              
                              )
                              })
                            }
                
                        </List>
                      </Content>

                      <FAB buttonColor="red" iconTextColor="#fff" buttonColor="#024DFA" onClickAction={() => {navigate('PetForm')}} visible={true} />
                    </Container>
          
        );

    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  avatar:{
    margin:10
  }
});


AppRegistry.registerComponent('PetComponent', () => PetComponent);
