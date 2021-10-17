import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  DeviceEventEmitter,
} from "react-native";
import { NativeModules } from "react-native";

import Swiper from "react-native-swiper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { storage } from "../../CommonUtil/StringUtil/DataStorge";
import Images from "../recourse/Images";

const Tab = createMaterialTopTabNavigator();
const MyNativeModule = NativeModules.MyNativeModule;

navigator.geolocation = require("@react-native-community/geolocation");


export default class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      activeTab: "tab1",
      selectCity: "",
    };
  }

  componentDidMount() {
    let imageViews = [];


    this.setState({
      images: imageViews,
    });
    this.getBannerImage();


  }

  componentWillUnmount() {

  }

  getBannerImage() {

  }






  render() {
    return (

      <View style={{ flex: 1, flexDirection: "column", backgroundColor: "blue" }}>



      </View>

    );

  }
}
