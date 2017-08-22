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
} from 'react-native';
//import HomeComponent from './src/components/home';
import { StackNavigator } from "react-navigation";
import { Container, Header, Content, List, ListItem, Thumbnail, Body,Left,Right } from 'native-base';

export default class PetTreatmentDetailsComponent extends Component {
constructor(props){
  super(props)
  
  this.state={allData:[]};

  console.disableYellowBox = true;
  const { navigate } = this.props.navigation;

  var paramsData = this.props.navigation.state.params.data;
   petArr = [];
  Object.keys(paramsData).forEach(function(key) {
      this.petArr.push(paramsData[key]);
  });
  if(petArr.length>0){
    this.state.allData = petArr;
  }

}

/*
  componentWillMount() {
      this.setState({allData:this.petArr});
  }
*/

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.allData == [] || this.state.allData == "" || this.state.allData == undefined){
      return <Text style={{textAlign:'center', top:40}}>No Past reatment found</Text>
    }    
    
    
    return (
         /* <Container>
                  <Content>
                       
                    <List >
                                <ListItem style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',fontWeight: 'bold'}}>
                                    <Text>Appointment Date</Text>
                                    <Text>Purpose</Text>
                                    <Text>Sickness</Text>
                                    <Text>Treatment</Text>
                                </ListItem>

                       {this.state.allData.map((item)=>{
                              return (
                                <ListItem style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                    <Text>{item.pet_treatment_date}</Text>
                                    <Text>{item.visitreason}</Text>
                                    <Text>{item.pet_problem}</Text>
                                    <Text>{item.pet_treatment}</Text>
                                </ListItem>
                              )
                        })
                      }
            
                    </List>
                  </Content>
            </Container>*/

              <Container  style={{backgroundColor:'#fff'}}>
                      <Content>    
                        <List>
                          {this.state.allData.map((item, i)=>{
                              return (
                                
                              <ListItem style={styles.listinput}>
                                <Body >
                                  <Text style={styles.text} >Appointment Date : {item.pet_treatment_date}</Text>
                                  <Text style={{ fontSize:18,fontWeight:'bold', left:10}}>Doctor Name : {item.doctor_name}</Text>
                                  <Text style={{ fontSize:18,fontWeight:'bold', left:10}}>Purpose : {item.visitreason}</Text>
                                  <Text style={{ fontSize:18,fontWeight:'bold', left:10}}>Sickness : {item.pet_problem}</Text>
                                  <Text style={{ fontSize:18,fontWeight:'bold', left:10}}>Treatment : {item.pet_treatment}</Text>
                                </Body>
                              </ListItem>
                              )
                              })
                            }
                
                        </List>
                      </Content>
                    </Container>



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
    textAlign: 'center',
    margin: 10,
  },
  listinput:{
    padding:10,
   // backgroundColor:'#F7E8E5',
    right:10,
    alignItems: 'center',
  },
  text:{
    fontSize:20,
    fontWeight: 'bold',
    padding:10,
    color:"#000",
    alignItems: 'center',
  }

});


AppRegistry.registerComponent('PetTreatmentDetailsComponent', () => PetTreatmentDetailsComponent);
