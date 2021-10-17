import React from "react";
import {SafeAreaView, StatusBar, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import Router from "./src/navigator/Router";

const Stack = createStackNavigator();

const time = new Date().getTime();
let i = 50

export default class App extends React.Component {

  constructor() {
    super();
    this.state={
      lineData: this.getData(),

    }
  }
  getData() {
    var data = []
    for (let j = 0; j < 50; j++) {
      data.push(Math.random() * 100)
    }
    return data;
  }

  componentDidMount() {
    this.setStateInterval = setInterval(() => {
      i = i + 1
      var data = this.state.lineData;
      if (data.length > 50) {
        data.shift()
      }
      data.push(
        Math.random() * 100
      )
      this.setState({
        lineData: data
      })
    }, 200);

  }


  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{
          backgroundColor: "#5a287f",
          flex: 0,
        }}>
        </SafeAreaView>
        <SafeAreaView
          style={{
            flexDirection: 'column',
            backgroundColor: "#5a287f",
            flex: 1,
          }}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="#5a287f"/>
          <Router/>

        </SafeAreaView>
        <SafeAreaView style={{
          backgroundColor: "white",
          flex: 0,
        }}>
        </SafeAreaView>
      </View>
    );
  }
}
