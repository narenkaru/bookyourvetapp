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

export default class AboutComponent extends Component {
  render() {
       const { navigate } = this.props.navigation;
    return (
     /* <Container style={styles.container}>
        <Content >
        <Image
            style={{width: 200, height: 200}}
                  source={{uri:'https://firebasestorage.googleapis.com/v0/b/bookyourvet-6ab87.appspot.com/o/about.jpg?alt=media&token=5d103321-5e15-431e-a4aa-9b856a1aea48'}}
          />
        <Text style={styles.input}>
         Our first veterinary clinic has grew by leaps & bounds since it’s opening in 1972 by our founder, Dr S. Sivagurunathan. He is a founding member of VET-ONE USA (1975) and the second Asian member to join Veterinary Emergency and Critical Care Society (VECCS) in 1978. He was a pioneer in emergency veterinary services in Malaysia. Dr Sivagurunathan was appointed an Associate Professor Madya at UPM in 1990 for his early work in animal welfare and lectured the undergraduates on welfare and ethics. He was a Past President of the Veterinary Association of Malaysia (VAM), Malaysian Small Animal Veterinary Association (MSAVA)-  formerly SAPAM and a senior past member of the Malaysian Veterinary Council (MVC). He is currently an active in a number of boards and foundations.
During our 25th Anniversary in 1997, Dr S Sivagurunathan, launched his book “Pets Have Feelings Too” that payed tribute to the life and times of a young practitioner in his early days of veterinary medicine in Malaysia.  The event was officiated by the Minister of Agriculture at the time, YBhg Tan Sri Amar Sulaiman Daud.

      </Text>
      <Text style={styles.input}>
        Since then, we have introduced various facilities and services in-line with international standards of practice in two veterinary practices in the Klang Valley. Our corporate headquarters, Animal Medical Centre is an internationally accredited referral hospital.
        </Text>
      </Content>
      </Container>*/
      <Container>
        <Content>
          <View style={styles.container}>
            <Image
                style={{width: 200, height: 200}}
                source={{uri:'https://firebasestorage.googleapis.com/v0/b/bookyourvet-6ab87.appspot.com/o/about.jpg?alt=media&token=5d103321-5e15-431e-a4aa-9b856a1aea48'}}
            />
            <Text style={styles.input}>
            Our first veterinary clinic has grew by leaps & bounds since it’s opening in 1972 by our founder, Dr S. Sivagurunathan. He is a founding member of VET-ONE USA (1975) and the second Asian member to join Veterinary Emergency and Critical Care Society (VECCS) in 1978. He was a pioneer in emergency veterinary services in Malaysia. Dr Sivagurunathan was appointed an Associate Professor Madya at UPM in 1990 for his early work in animal welfare and lectured the undergraduates on welfare and ethics. He was a Past President of the Veterinary Association of Malaysia (VAM), Malaysian Small Animal Veterinary Association (MSAVA)-  formerly SAPAM and a senior past member of the Malaysian Veterinary Council (MVC). He is currently an active in a number of boards and foundations.
    During our 25th Anniversary in 1997, Dr S Sivagurunathan, launched his book “Pets Have Feelings Too” that payed tribute to the life and times of a young practitioner in his early days of veterinary medicine in Malaysia.  The event was officiated by the Minister of Agriculture at the time, YBhg Tan Sri Amar Sulaiman Daud.

          </Text>
          <Text style={styles.input}>
            Since then, we have introduced various facilities and services in-line with international standards of practice in two veterinary practices in the Klang Valley. Our corporate headquarters, Animal Medical Centre is an internationally accredited referral hospital.
            </Text>
          </View>
      </Content>
      </Container>
    );
  }
}


/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    //textAlign: 'justify'
  }, 
  input:{
    padding:20,
    fontSize:20,
    //justifyContent:'space-between',
    textAlign: 'auto'
  }

});*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }, 
  input:{
    //padding:20,
    margin:20,
    fontSize:20,
    fontWeight:"bold"
  }
})


AppRegistry.registerComponent('AboutComponent', () => AboutComponent);