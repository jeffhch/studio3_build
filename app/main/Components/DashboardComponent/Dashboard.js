import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Title, ActivityIndicator} from 'react-native-paper';
import styles from './Dashboard.styles';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import UQPosts from '../UQPostsComponent/UQPosts';
import UserProfile from '../UserProfileComponent/UserProfile';
import {getStoredUserDataFromFireStore} from '../../_services/_storageSorvice';


const BottomTabs = createMaterialBottomTabNavigator();

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataFromFireStore: {id: null},
    };
  }

  forceToAuthScreen = () => {
    this.setState(
      {
        userDataFromFireStore: {id: null},
      },
      () => this.props.isAuthentionSuccessFull(false, null),
    );
  };

  getStoredUserDataFromFireStore = () => {
    getStoredUserDataFromFireStore(this.props.userData)
      .then(response => {
        if (response.size > 0)
          response.forEach(documentSnapshot => {
            this.setState({
              userDataFromFireStore: {
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
              },
            });
          });
        else this.forceToAuthScreen();
      })
      .catch(err => this.forceToAuthScreen());
  };

  componentDidMount() {
    this.getStoredUserDataFromFireStore();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.userDataFromFireStore.id !==
        this.state.userDataFromFireStore.id &&
      this.state.userDataFromFireStore.id !== null
    )
      this.getStoredUserDataFromFireStore();
  }

  render() {
    const iconSize = 23;
    const {userDataFromFireStore} = this.state;
    return (
      <>
        {!userDataFromFireStore.id && (
          <View
            style={{
              ...styles.container,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#512378'}}>Welcome to</Text>
            <Title style={{color: '#512378', fontSize: 22, letterSpacing: 5}}>
              UQLife
            </Title>
            <ActivityIndicator
              animating={true}
              color={'#512378'}
              small
              style={{marginTop: '7%'}}
            />
          </View>
        )}

        {userDataFromFireStore.id && (
          <View style={{flex: 1}}>
            <BottomTabs.Navigator
              initialRouteName="UQPosts"
              activeColor="#512378"
              labeled={false}
              barStyle={{backgroundColor: '#fff'}}>
              <BottomTabs.Screen
                name="UserProfile"
                children={() => (
                  <UserProfile userDataFromFireStore={userDataFromFireStore} />
                )}
                options={{
                  tabBarIcon: ({color}) => (
                    <AntIcons
                      name="home"
                      color={color}
                      size={iconSize}
                    />
                  ),
                }}
              />

              <BottomTabs.Screen
                name="UserProfile1"
                children={() => (
                  <UserProfile userDataFromFireStore={userDataFromFireStore} />
                )}
                options={{
                  tabBarIcon: ({color}) => (
                    <Icon name="bell-outline" color={color} size={iconSize} />
                  ),
                }}
              />

              <BottomTabs.Screen
                name="UQPosts"
                children={() => (
                  <UQPosts userDataFromFireStore={userDataFromFireStore} />
                )}
                options={{
                  tabBarIcon: ({color}) => (
                    <Icon name="email-variant" color={color} size={iconSize} />
                  ),
                }}
              />

              <BottomTabs.Screen
                name="UserProfile2"
                children={() => (
                  <UserProfile userDataFromFireStore={userDataFromFireStore} />
                )}
                options={{
                  tabBarIcon: ({color}) => (
                    <IonIcon
                      name="location-outline"
                      color={color}
                      size={iconSize}
                    />
                  ),
                }}
              />

              <BottomTabs.Screen
                name="UserProfile3"
                children={() => (
                  <UserProfile userDataFromFireStore={userDataFromFireStore} />
                )}
                options={{
                  tabBarIcon: ({color}) => (
                    <AntIcons name="user" color={color} size={iconSize - 1} />
                  ),
                }}
              />
            </BottomTabs.Navigator>
          </View>
        )}
      </>
    );
  }
}



