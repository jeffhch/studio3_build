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


export default class HomeScreen extends React.Component {
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
    imageViews.push(Images.home.banner1);
    imageViews.push(Images.home.banner2);
    imageViews.push(Images.home.banner3);
    imageViews.push(Images.home.banner4);


    this.setState({
      images: imageViews,
    });
    this.getBannerImage();


  }

  componentWillUnmount() {

  }

  getBannerImage() {

  }


  bannerOnPress(item) {
    console.log("item", item.type);
    switch (item.type) {
      case "essay":
        this.props.navigation.navigate("ArticleDetail", { detailId: item.id });
        break;
    }
  }

  renderImg() {
    let imageViews = [];
    for (let i = 0; i < this.state.images.length; i++) {
      imageViews.push(
        <View style={{
          flex: 1,

          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: "transparent",
        }}>
          <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}
                            onPress={() => this.bannerOnPress(this.state.images[i])}>

            <Image
              style={{ flex: 1, resizeMode: "stretch", borderRadius: 5 }}
              source={this.state.images[i]}

            />

          </TouchableOpacity>
          <Text style={{ fontSize: 30, color: "white", position: "absolute" }}>Orientation</Text>

        </View>
        ,
      )
      ;
    }
    return imageViews;
  }

  renderTopSearch() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Search")}>

          <View style={HomeStyles.searchBg}>
            <View
              style={HomeStyles.searchContain}>

              <Text style={HomeStyles.searchText}>Home</Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>
    );
  }

  renderTopBanner() {
    return (<View>

      <View style={{ flexDirection: "column", height: 180 }}>

        <View style={{
          height: 200,
          backgroundColor: "transparent",
          position: "absolute",
        }}>
          <Swiper
            activeDotColor={"white"}
            height={180}
            loop={true}
            index={0}
            autoplay={false}
            horizontal={true}
          >
            {this.renderImg()}
          </Swiper>
        </View>
      </View>

    </View>);
  }


  renderCenter() {
    return (<View>
      <View style={{ marginTop: 30, flexDirection: "column", borderRadius: 5, marginLeft: 30, marginRight: 30 }}>
        <Text style={{ fontSize: 20, color: "black" }}>Tools</Text>

        <View style={{ flex: 1, flexDirection: "row", height: 120, marginTop: 20 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate("Other")}>

            <View style={{
              backgroundColor: "#5a287f",
              flex: 1,
              marginRight: 15,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}>
              <Image style={HomeStyles.centerImage} source={Images.home.ic_home_notify} />
              <Text style={HomeStyles.centerText}>UQ NEWS</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.jumpTo("Location", "123")}>

            <View style={{
              backgroundColor: "#5a287f",
              flex: 1,
              marginLeft:15,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}>
              <Image style={HomeStyles.centerImage} source={Images.home.ic_home_local} />
              <Text style={HomeStyles.centerText}>UQ MAP</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexDirection: "row", height: 120, marginTop: 20 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.jumpTo("Message", "123")}>

          <View style={{
            backgroundColor: "#5a287f",
            flex: 1,
            marginRight: 15,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
            <Image style={HomeStyles.centerImage} source={Images.home.ic_home_email} />
            <Text style={HomeStyles.centerText}>UQ POST</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.jumpTo("Setting", "123")}>

          <View style={{
            backgroundColor: "#5a287f",
            flex: 1,
            marginLeft:15,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
            <Image style={HomeStyles.centerImage} source={Images.home.ic_home_phone} />
            <Text style={HomeStyles.centerText}>HELP</Text>
          </View>
          </TouchableOpacity>
        </View>


      </View>
    </View>);
  }


  render() {
    return (

      <View style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}>

        {this.renderTopSearch()}
        <ScrollView style={{ flex: 1 }}>
          {this.renderTopBanner()}
          {this.renderCenter()}
        </ScrollView>

      </View>

    );

  }
}

const HomeStyles = StyleSheet.create({
  searchImage: {
    height: 15,
    width: 15,
    alignSelf: "center",
  },
  searchText: { fontSize: 16, alignSelf: "center", color: "white" },
  searchContain: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 20,
    height: 35,
  },
  searchBg:
    {
      height: 50, backgroundColor: "#8736ac", flexDirection: "column", justifyContent: "center",
    },
  centerText:
    {
      fontSize: 20, color: "white", marginTop: 8,
    },

  centerImage:
    {
      height: 50, width: 50,
    },

});
