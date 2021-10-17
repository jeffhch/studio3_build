import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import HomeScreen from "../page/HomeScreen";
import { OtherPage } from "../page/OtherPage";
import BottomTabs from "./BottomTabs";
import HelpPage from "../page/HelpPage";
import MapPage from "../page/MapPage";
import PostPage from "../page/PostPage";
import NewsPage from "../page/NewsPage";


const ModalStack = createStackNavigator();

function ModalStackScreen() {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="screen"

      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}>
      <ModalStack.Screen
        name="Root"
        component={BottomTabs} />
      <ModalStack.Screen
        name="Home"
        component={HomeScreen} />
      <ModalStack.Screen
        name="HelpPage"
        component={HelpPage} />
      <ModalStack.Screen
        name="MapPage"
        component={MapPage} />
      <ModalStack.Screen
      name="PostPage"
      component={PostPage} />
      <ModalStack.Screen
      name="NewsPage"
      component={NewsPage} />
    </ModalStack.Navigator>
  );
}

export default class Router extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <ModalStackScreen />
      </NavigationContainer>
    );
  }
}

