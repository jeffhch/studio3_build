import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Auth from './main/Components/AuthComponent/Auth';
import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import Dashboard from './main/Components/DashboardComponent/Dashboard';
import {createStackNavigator} from '@react-navigation/stack';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#512378',
  },
};

const ParentStackNavigator = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated:false,
      userData: null,
    };
  }

  isAuthentionSuccessFull = (status, userData) => {
    this.setState({isAuthenticated: status, userData: userData});
  };

  render() {
    const {isAuthenticated, userData} = this.state;

    return (
      <PaperProvider
        theme={theme}
        settings={{
          icon: props => <AntDesignIcon {...props} />,
        }}>
        <NavigationContainer>
          <ParentStackNavigator.Navigator screenOptions={{headerShown: false}}>
            {isAuthenticated && userData ? (
              <ParentStackNavigator.Screen
                name="Dashboard"
                children={props => (
                  <Dashboard
                    userData={userData}
                    isAuthentionSuccessFull={this.isAuthentionSuccessFull}
                    {...props}
                  />
                )}
              />
            ) : (
              <ParentStackNavigator.Screen
                name="Auth"
                children={props => (
                  <Auth
                    isAuthentionSuccessFull={this.isAuthentionSuccessFull}
                    {...props}
                  />
                )}
              />
            )}
          </ParentStackNavigator.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
