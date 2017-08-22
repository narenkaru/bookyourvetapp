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

import { Select, Option } from 'react-native-select-list';


import { Container, Header, Title, Content, Icon, Right, Body, Left, Picker, Form, Item as FormItem } from "native-base";
import DatePicker from 'react-native-datepicker'
const firebase = require('firebase');



const Item = Picker.Item;
export default class AppointmentComponent extends Component {


    constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      defaultDoctor: "Select Doctor",
      doctors:[ ],
      defaultPet:"Select Pet",
      pets:[],
      date:null,
      //time:null,
      username:null,
      phone:null,
      additional:null,
      species:null,
      doctor_id:null,
      userPetIndex:null,
      timeDetails:[],
      time:'Select Time'


    };
  }

    onValueChange3(value) {
      if(value == 'Select Doctor'){
          this.setState({doctor_id : null})
      }else{
          var userRef = firebase.database().ref('users');
          userRef.once('value',(DocSnap)=>{
            if(DocSnap.val()){
              var allDocs = DocSnap.val();
              for(var key in allDocs){
                allDocs[key].id = key;
                if(allDocs[key].name == value){
                  this.setState({doctor_id : allDocs[key].id})
                }
              }
            }
          })
      }

    this.setState({
      defaultDoctor: value
    });
  }

    changePet(value) {
      console.log(value);
      var petDet = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/');
      petDet.once('value',(petSnap)=>{
        if(petSnap.val()){
         // console.log(petDet)
          var petsall = petSnap.val();
          for(var i=0;i<petsall.length;i++){
            if(petsall[i].name == value){
              this.setState({species:petsall[i].species})
              this.setState({userPetIndex:i})
            }
          }
        }
      })

    this.setState({
      defaultPet: value
    });
  }

  onValueChange4(value){
      this.setState({time:value})
      if(value == 'Select Time'){
        Alert.alert("You selected invalid time");
      }else{
        if(this.state.doctor_id){
            if(this.state.date){

              var reff = firebase.database().ref('users/' + this.state.doctor_id);
              reff.once('value',(snap3)=>{
                if(snap3.val()){
                  if(snap3.val().booking_times){
                      var bookingTime = snap3.val().booking_times;
                      for( var key in bookingTime){
                        if(bookingTime[key].time == this.state.time && bookingTime[key].date == this.state.date){
                          this.setState({time:'Select Time'});
                          Alert.alert("Appointment time not available.", "Please change your Appointment timing or Doctor");
                          break;
                        }
                      }

                  }
                }
              })


            }else{
                this.setState({time:'Select Time'});
                Alert.alert("Please Select your Appointment Date first")
            }
        }else{
          this.setState({time:'Select Time'});
          Alert.alert("Please Select your doctor first")
        }
      }
  }
  

  componentWillMount(){
    var ArrData=[{name:"Select Doctor"}];
    var PetArr=[{name:"Select Pet"}];
    var cDate = this.formatLocalDate();
    this.setState({
        date:cDate.substring(0, 10),
       // time:cDate.substring(11, 19)
    })


    var ref = firebase.database().ref('users');
    var petref = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
        ref.once('value',(snapshot)=>{
            if(snapshot.val()){
              var allSnap= snapshot.val();
              for(var key in allSnap){
                  allSnap[key].id = key;
                  if(allSnap[key].type == "doctor"){
                      ArrData.push(allSnap[key]);
                  }
              }
                console.log(ArrData);
              this.setState({doctors:ArrData})
            }
        })
        petref.once('value',(snap2)=>{
            if(snap2.val()){
              this.setState({username:snap2.val().name})
              if(snap2.val().pets){
                var allpets = snap2.val().pets;
                for(var i=0; i<allpets.length; i++){
                  PetArr.push(allpets[i]);
                }
                console.log(PetArr);
                this.setState({
                  pets:PetArr
                })
              }
            }
        }) 
          
        //time selection
        var timeData=['Select Time'];
          var dref = firebase.database().ref('doctor_schedule');
          dref.once('value',(snapData)=>{
           var alltime = snapData.val();
           for(var k=0; k<alltime.length; k++){
             timeData.push(alltime[k]);
           }
            this.setState({timeDetails:timeData})
          })


  }



   formatLocalDate() {
    var now = new Date(),
        tzo = -now.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return now.getFullYear() 
        + '-' + pad(now.getMonth()+1)
        + '-' + pad(now.getDate())
        + 'T' + pad(now.getHours())
        + ':' + pad(now.getMinutes()) 
        + ':' + pad(now.getSeconds()) 
				+ '.000Z'
}

//submit details
submitAppointment(navigate){
  console.log(this.state);

    if(this.state.defaultDoctor == undefined || this.state.defaultDoctor == "" || this.state.defaultDoctor=="Select Doctor"
       || this.state.defaultPet =="" || this.state.defaultPet =="Select Pet" ||
        this.state.defaultPet==undefined|| this.state.additional == "" || this.state.additional == undefined ||
        this.state.date == "" || this.state.date == undefined ||this.state.time == "Select Time" || this.state.time =="" || this.state.time == undefined ||
        this.state.phone == ""||this.state.phone == undefined ){

            if(this.state.defaultDoctor == undefined || this.state.defaultDoctor == ""){
              Alert.alert("Please select Preffered doctor");
            }else if(this.state.defaultPet =="" || this.state.defaultPet == undefined){
              Alert.alert("Please select Yout pet");
            }else if(this.state.additional == "" || this.state.additional == undefined){
              Alert.alert("Please select addition Comments");
            }else if(this.state.date == "" || this.state.date == undefined){
              Alert.alert("Please select Date");
            }else if(this.state.time =="" || this.state.time == undefined ){
              Alert.alert("Please select Time");
            }else if(this.state.phone == ""||this.state.phone == undefined){
              Alert.alert("Please select phone number");
            }
    }else{

 /*     var reff = firebase.database().ref('users/' + this.state.doctor_id);
      reff.once('value',(snap3)=>{
        if(snap3.val()){
          if(snap3.val().booking_times){
              var bookingTime = snap3.val().booking_times;
              var found=false;
              for( var key in bookingTime){
                if(bookingTime[key].time == this.state.time && bookingTime[key].date == this.state.date){
                  found=true;

                  break;
                }
              }
              if(found){
                  this.setState({time:'Select Time'});
                  Alert.alert("Appointment time not available.", "Please change your Appointment timing or Doctor");
              }else{
                this.submit(navigate);
              }

          }
        }
      })*/


      var appoDetails={
        username:this.state.username,
        date:this.state.date,
        time:this.state.time,
        name:this.state.defaultPet,
        prefferDoctor:this.state.defaultDoctor,
        phoneNo:this.state.phone,
        additionalComments:this.state.additional,
        appointment_userId:firebase.auth().currentUser.uid,
        selectPet: this.state.species,
        doctor_id:this.state. doctor_id//,
       // status:"new"
      }

      var petDetails = {
          date:this.state.date,
          time:this.state.time,
          prefferDoctor:this.state.defaultDoctor,
          additionalComments:this.state.additional,
          doctor_id:this.state. doctor_id,
      }
        var dateTimeDetails={
          date:this.state.date,
          time:this.state.time,
        }
        //currentuser submit
        var uRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
        uRef.once('value',(appolist)=>{
          if(appolist.val()){
            if(appolist.val().appointments){
              var allAppolist = appolist.val().appointments;
              firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/appointments/' + allAppolist.length).set(appoDetails);
            }else{
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/appointments/0/').set(appoDetails);
            }
          }
        })
        
        //doctor submit
        firebase.database().ref('users/' + this.state.doctor_id + '/myAppointment/').push(appoDetails);
        firebase.database().ref('users/' + this.state.doctor_id + '/booking_times/').push(dateTimeDetails);
        //Appointment submit
        firebase.database().ref('appointment').push(appoDetails);
        if(this.state.userPetIndex){
           firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/' + this.state.userPetIndex + '/appointment/').push(appoDetails);
        }

        //pets submit
        var petsref = firebase.database().ref('pets');
        petsref.once('value',(snapPets)=>{
          if(snapPets.val()){
            var totalPets = snapPets.val();
            for(var j=0; j<totalPets.length; j++){
              if(totalPets[j].name == this.state.defaultPet && totalPets[j].userId == firebase.auth().currentUser.uid){
                  firebase.database().ref('pets/' + j + '/appointment/').push(petDetails);
              } 
            }
          }
        })

        navigate('reminder')
    }


}
/*  submit(navigate){

      var appoDetails={
        username:this.state.username,
        date:this.state.date,
        time:this.state.time,
        name:this.state.defaultPet,
        prefferDoctor:this.state.defaultDoctor,
        phoneNo:this.state.phone,
        additionalComments:this.state.additional,
        appointment_userId:firebase.auth().currentUser.uid,
        selectPet: this.state.species,
        doctor_id:this.state. doctor_id//,
       // status:"new"
      }

      var petDetails = {
          date:this.state.date,
          time:this.state.time,
          prefferDoctor:this.state.defaultDoctor,
          additionalComments:this.state.additional,
          doctor_id:this.state. doctor_id,
      }
        var dateTimeDetails={
          date:this.state.date,
          time:this.state.time,
        }
        //currentuser submit
        var uRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
        uRef.once('value',(appolist)=>{
          if(appolist.val()){
            if(appolist.val().appointments){
              var allAppolist = appolist.val().appointments;
              firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/appointments/' + allAppolist.length).set(appoDetails);
            }else{
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/appointments/0/').set(appoDetails);
            }
          }
        })
        
        //doctor submit
        firebase.database().ref('users/' + this.state.doctor_id + '/myAppointment/').push(appoDetails);
        firebase.database().ref('users/' + this.state.doctor_id + '/booking_times/').push(dateTimeDetails);
        //Appointment submit
        firebase.database().ref('appointment').push(appoDetails);
        if(this.state.userPetIndex){
           firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pets/' + this.state.userPetIndex + '/appointment/').push(appoDetails);
        }

        //pets submit
        var petsref = firebase.database().ref('pets');
        petsref.once('value',(snapPets)=>{
          if(snapPets.val()){
            var totalPets = snapPets.val();
            for(var j=0; j<totalPets.length; j++){
              if(totalPets[j].name == this.state.defaultPet && totalPets[j].userId == firebase.auth().currentUser.uid){
                  firebase.database().ref('pets/' + j + '/appointment/').push(petDetails);
              } 
            }
          }
        })

        navigate('reminder')


  }*/




  render() {
    const { navigate } = this.props.navigation;


      return (
            <Container >

              <Content>
                <View style={styles.container}>
              <Text style={styles.welcome}>
                  Book Appointment
              </Text>

                <Picker style={styles.name}
                //doctor names
                    mode="dropdown"
                    headerBackButtonText="Baaack!"
                    selectedValue={this.state.defaultDoctor}
                    onValueChange={this.onValueChange3.bind(this)}
                    
                  >
                    {this.state.doctors.map((list, key)=>{
                      return (
                      <Item label={list.name} value={list.name} />
                      )
                      })
                      }

                </Picker>              

              <DatePicker style={styles.name}
                      customStyles={{dateInput:{borderWidth: 0}}}
                      //Date
                      date={this.state.date? this.state.date : "select date"}
                      mode="date"
                      format="YYYY-MM-DD"
                      minDate="2016-05-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={(date) => {this.setState({date: date})}}
                />

                <Picker style={styles.name}
                //time
                    mode="dropdown"
                    headerBackButtonText="Baaack!"
                    selectedValue={this.state.time}
                    onValueChange={this.onValueChange4.bind(this)}
                    
                  >
                    {this.state.timeDetails.map((item, key)=>{
                      return (
                      <Item label={item} value={item} />
                      )
                      })
                      }
                </Picker>


                <TextInput style={styles.name}
                    underlineColorAndroid='transparent'
                    editable={false}
                    placeholder="Username"
                    returnKeyLabel = {"next"}
                    value={this.state.username}
                   // onChangeText={(text) => this.setState({username:text})}
                />
                <TextInput style={styles.name}
                    underlineColorAndroid='transparent'
                    placeholder="Phone number"
                    returnKeyLabel = {"next"}
                    onChangeText={(text) => this.setState({phone:text})}
                />
                <Picker style={styles.name}
                    mode="dropdown"
                    headerBackButtonText="Baaack!"
                    selectedValue={this.state.defaultPet}
                    onValueChange={this.changePet.bind(this)}
                  >
                  {this.state.pets.map((list, i)=>{
                    return (
                     <Item label={list.name} value={list.name} />
                    )
                    })
                    }

                </Picker>
                <TextInput style={styles.name}
                    underlineColorAndroid='transparent'
                    placeholder="Additional Comments"
                    returnKeyLabel = {"next"}
                    onChangeText={(text) => this.setState({additional:text})}
                /> 
                <Button color="#ff3333"
                  onPress={() => this.submitAppointment(navigate)}
                  title="REQUEST APPOINTMENT"
                />
                  <Text></Text>
                </View>
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
    backgroundColor: '#f2f2f2',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    fontWeight:'bold',
    color:'#ff3333'
  },
  name:{
    padding:10, marginBottom:15, width: 300, backgroundColor:'#fff', color:'#000'
  },
  selectTag:{
   width:300
  }
});


AppRegistry.registerComponent('AppointmentComponent', () => AppointmentComponent);
