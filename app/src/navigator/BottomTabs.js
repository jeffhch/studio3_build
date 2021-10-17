import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import Images from "../recourse/Images";
import HomeScreen from "../page/HomeScreen";
import OtherPage from "../page/OtherPage";
import PostPage from "../page/PostPage";
import HelpPage from "../page/HelpPage";
import MapPage from "../page/MapPage";
//Import page modules

const Tab = createBottomTabNavigator();

export default class BottomTabs extends Component {
  render() {
    return (

      <Tab.Navigator
        backBehavior={false}
        tabBarOptions={{
          activeTintColor: "green",
          inactiveTintColor: "gray",
          tabStyle: {
            backgroundColor: "#fff",
            borderRightWidth: 1,
            borderRightColor: "#fff",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{

            tabBarLabel: ({ focused }) => {
              return (
                <Image
                  style={{ height: 0 }}
                  source={focused ? Images.home.ic_bottom_select : Images.home.ic_bottom_no_select}
                />

              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  style={styles.icon}
                  source={focused ? Images.home.ic_bottom_select : Images.home.ic_bottom_no_select}
                />

              );
            },
          }} />
        <Tab.Screen
          name="Other"
          component={OtherPage}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Image
                  style={{ height: 0 }}
                  source={focused ? Images.home.ic_bottom_select : Images.home.ic_bottom_no_select}
                />

              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  style={styles.icon}
                  source={focused ? Images.notify.ic_bottom_select : Images.notify.ic_bottom_no_select}
                />

              );
            },
          }} />
        <Tab.Screen
          name="Message"
          component={PostPage}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Image
                  style={{ height: 0 }}
                  source={focused ? Images.home.ic_bottom_select : Images.home.ic_bottom_no_select}
                />

              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  style={styles.icon}
                  source={focused ? Images.message.ic_bottom_select : Images.message.ic_bottom_no_select}
                />

              );
            },
          }} />
        <Tab.Screen
          name="Location"
          component={MapPage}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Image
                  style={{ height: 0 }}
                  source={focused ? Images.home.ic_bottom_select : Images.home.ic_bottom_no_select}
                />

              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  style={styles.icon}
                  source={focused ? Images.location.ic_bottom_select : Images.location.ic_bottom_no_select}
                />

              );
            },
          }} />
        <Tab.Screen
          name="Setting"
          component={HelpPage}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Image
                  style={{ height: 0 }}
                  source={focused ? Images.home.ic_bottom_select : Images.home.ic_bottom_no_select}
                />

              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  style={{
                    width: 20,
                    height: 22,
                  }}
                  source={focused ? Images.setting.ic_bottom_select : Images.setting.ic_bottom_no_select}
                />

              );
            },
          }} />
      </Tab.Navigator>

    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  headerRight: {
    paddingRight: 15,
  },
});

