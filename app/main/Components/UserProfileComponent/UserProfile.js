import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Card, Title, Text, Paragraph, Avatar, Button} from 'react-native-paper';
import styles from './UserProfileComponent.styles';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import {listenToActiveUsersStorage} from '../../_services/_storageSorvice';

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: null,
      userName: null,
      uqCoins: 0,
      hasData: false,
    };
  }

  refreshUserData = userQueryData => {
    if (userQueryData.size > 0)
      userQueryData.forEach(documentSnapshot => {
        const data = documentSnapshot.data();
        console.log('---- user Profile ------');
        console.log(data);
        this.setState({
          userEmail: data.email,
          userName: data.username,
          uqCoins: data.uqCoins,
          hasData: true,
        });
      });
  };

  componentDidMount() {
    const {email, username, id, uqCoins} = this.props.userDataFromFireStore;

    console.log(this.props.userDataFromFireStore);

    if (id && email && username) {
      listenToActiveUsersStorage(this.refreshUserData, email);
    } else this.setState({hasData: false});
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.userEmail !== prevState.userEmail &&
      prevState.userEmail !== null
    ) {
      const {email, username, id, uqCoins} = this.props.userDataFromFireStore;
      if (id && email && username) {
        listenToActiveUsersStorage(this.refreshUserData, email);
      } else this.setState({hasData: false});
    }
  }

  render() {
    const {hasData, userName, uqCoins} = this.state;
    return (
      <>
        {hasData && (
          <ScrollView style={{...styles.container, backgroundColor: '#fff'}}>
            <View style={{paddingHorizontal: '5%'}}>
              <Card style={{marginTop: '10%'}}>
                <Card.Content style={{flex: 1}}>
                  <View
                    style={{
                      ...styles.container,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Title>Name</Title>
                      <Paragraph>{userName}</Paragraph>
                    </View>

                    <View>
                      <Paragraph>Balance</Paragraph>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Avatar.Text
                          label={'UQ'}
                          size={20}
                          style={{marginRight: 5}}
                        />
                        <Title>{uqCoins}</Title>
                      </View>
                    </View>
                  </View>
                </Card.Content>
                <Card.Actions
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    paddingTop: '15%',
                  }}>
                  <Button mode="outlined" style={{borderRadius: 50}}>
                    Redeem history
                  </Button>
                </Card.Actions>
              </Card>
            </View>

            <View
              style={{
                ...styles.container,
                paddingHorizontal: '5%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <Card style={{backgroundColor: '#fa5353', borderRadius: 15}}>
                <Card.Content
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}>
                  <AntIcon name="gift" icon="gift" size={30} color={'#fff'} />
                  <Title style={{color: '#fff', marginLeft: '2%'}}>
                    Rewards
                  </Title>
                </Card.Content>
              </Card>

              <Card style={{backgroundColor: '#fde294', borderRadius: 15}}>
                <Card.Content
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}>
                  <Fa5Icon
                    name="coins"
                    icon="coins"
                    size={30}
                    color={'#323232'}
                  />
                  <Title style={{color: '#323232', marginLeft: '2%'}}>
                    Get Coins
                  </Title>
                </Card.Content>
              </Card>
            </View>

            <View
              style={{
                paddingHorizontal: '5%',
                flexDirection: 'column',
                marginTop: '5%',
              }}>
              <Title>Popular rewards</Title>

              <View
                style={{
                  ...styles.container,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginTop: '5%',
                }}>
                <View
                  style={{
                    ...styles.container,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: '0%',
                    backgroundColor: '#fff',
                  }}>
                  <Card
                    style={{
                      width: '45%',
                      height: '75%',
                    }}>
                    <Card.Cover
                      source={require('../../assets/pizza.jpg')}
                      style={{maxHeight: '60%'}}
                    />
                    <Card.Content>
                      <Paragraph>Pizza coupons</Paragraph>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          paddingTop : "10%"
                        }}>
                        <Avatar.Text
                          label={'UQ'}
                          size={20}
                          style={{marginRight: 5}}
                        />
                        <Title style={{fontWeight: 'normal'}}>2000</Title>
                      </View>
                    </Card.Content>
                  </Card>
                  <Card
                    style={{
                      width: '45%',
                      height: '75%',
                      paddingBottom: 0,
                    }}>
                    <Card.Cover
                      source={require('../../assets/t_shirts.jpg')}
                      style={{maxHeight: '60%'}}
                    />
                    <Card.Content style={{paddingBottom: 0}}>
                      <Paragraph>Pair tshirts</Paragraph>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          paddingTop : "10%"
                        }}>
                        <Avatar.Text
                          label={'UQ'}
                          size={20}
                          style={{marginRight: 5}}
                        />
                        <Title style={{fontWeight: 'normal'}}>1500</Title>
                      </View>
                    </Card.Content>
                  </Card>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </>
    );
  }
}

const UserProfileStackNavigator = createStackNavigator();

export default function UserProfile(props) {
  return (
    <UserProfileStackNavigator.Navigator>
      <UserProfileStackNavigator.Screen
        name="UserProfileStackScreen"
        children={navigationProps => (
          <UserProfileComponent {...navigationProps} {...props} />
        )}
        options={{
          headerTitle: 'REDEEM',
          headerTitleAlign: 'center',
          headerTintColor: '#512378',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#512378',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 16,
          },
        }}
      />
    </UserProfileStackNavigator.Navigator>
  );
}
