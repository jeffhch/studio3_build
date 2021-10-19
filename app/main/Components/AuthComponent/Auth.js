import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Title, Text, Snackbar, ActivityIndicator} from 'react-native-paper';
import Login from './LoginComponent/Login';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Register from './RegisterComponent/Register';
import {DeviceConfig} from '../../../Constants';
import {
  attemptLogin,
  attemptToRegister,
  attemptSignOut,
} from '../../_services/_authService';
import {Actions} from '../../../Constants';
import {storeUserDataToFireStore} from '../../_services/_storageSorvice';

const Tab = createMaterialTopTabNavigator();

export default class Auth extends Component {
  heading = 'Life.';

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      hasError: false,
      error: null,
      proceed: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.attemptSignOut();
  }

  setLoading = value => {
    this.setState({isLoading: value});
  };

  authFailed = message => {
    this.setState(
      {
        hasError: true,
        error: message,
        isAuthenticated: false,
      },
      () => this.props.isAuthentionSuccessFull(false, null),
    );
  };

  attemptLogin = ({email, password}) => {
    if (!this.state.isLoading) this.setLoading(true);

    attemptLogin(email, password)
      .then(response => {
        this.setState(
          {isAuthenticated: true, error: false, hasError: null},
          () => this.props.isAuthentionSuccessFull(true, email),
        );
      })
      .catch(error => {
        this.setLoading(false);
        this.authFailed('Unable to Login !!!');
      });
  };

  addUserToStorage = ({email, password, username}) => {
    storeUserDataToFireStore(null, Actions.ADD, email, username)
      .then(response =>
        this.setState(
          {isAuthenticated: true, error: false, hasError: null},
          () => this.attemptLogin({email, password}),
        ),
      )
      .catch(error => {
        this.setLoading(false);
        this.authFailed('Unable to register !!!');
      });
  };

  attemptToRegister = ({email, password, username}) => {
    this.setLoading(true);
    attemptToRegister(email, password)
      .then(response => this.addUserToStorage({email, password, username}))
      .catch(error => {
        this.setLoading(false);
        this.authFailed(
          error.message.split(']')[1].trim() ?? 'Unable to register !!!',
        );
      });
  };

  attemptSignOut = () => {
    attemptSignOut()
      .then(() => this.setState({proceed: true}))
      .catch(() => this.setState({proceed: true}));
  };

  render() {
    return (
      this.state.proceed && (
        <View
          style={{
            height: '100%',
            width: '100%',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#fff',
          }}>
          <Snackbar
            visible={this.state.hasError && !this.state.isAuthenticated}
            onDismiss={() => this.setState({hasError: false})}>
            {this.state.error}
          </Snackbar>

          <Title
            style={{
              fontSize: 30,
              color: '#512378',
              paddingHorizontal: '8%',
              paddingVertical: '6%',
              marginTop: '7%',
            }}>
            {this.heading}
          </Title>

          {this.state.isLoading && (
            <ActivityIndicator
              animating={true}
              color={'#512378'}
              style={{
                position: 'absolute',
                elevation: 1,
                top: '7%',
                right: '7%',
              }}
            />
          )}
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#fff',
            }}>
            <Tab.Navigator
              initialRouteName="Sign in"
              style={{
                backgroundColor: '#fff',
                elevation: 0,
                marginBottom: '30%',
              }}
              screenOptions={{
                tabBarIndicatorStyle: {
                  elevation: 0,
                  backgroundColor: '#000',
                  width: '30%',
                  marginLeft: '0%',
                },
                tabBarIndicatorContainerStyle: {
                  backgroundColor: '#fff',
                  elevation: 0,
                  boxShadow: '0px 0px 0px rgba(0,0,0,0.0)',
                },
                tabBarItemStyle: {
                  elevation: 0,
                  boxShadow: '0px 0px 0px rgba(0,0,0,0.0)',
                  marginHorizontal: '0%',
                  alignItems: 'flex-start',
                  paddingLeft: '0%',
                  borderBottomWidth: 1,
                  borderBottom: 1,
                  borderColor: 'rgba(0,0,0,0.4)',
                },
                tabBarStyle: {
                  elevation: 0,
                  marginHorizontal: '8%',
                },
                tabBarContentContainerStyle: {
                  textAlign: 'left',
                  borderWidth: 1,
                  borderBottom: 1,
                  borderColor: 'red',
                },
              }}>
              <Tab.Screen
                name="Sign in"
                children={() => <Login attemptLogin={this.attemptLogin} />}
                style={{paddingHorizontal: '10%'}}
              />
              <Tab.Screen
                name="Sign Up"
                children={navigatorProps => (
                  <Register
                    attemptToRegister={this.attemptToRegister}
                    {...navigatorProps}
                  />
                )}
              />
            </Tab.Navigator>
          </View>
        </View>
      )
    );
  }
}
