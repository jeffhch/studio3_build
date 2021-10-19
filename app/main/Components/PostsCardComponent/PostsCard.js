import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './PostsCard.styles';
import {Text, Card, Paragraph, Title, Avatar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getInitials} from '../../_services/_utilService';

export default class PostsCard extends Component {
  /*
  {"comments": [{"comment": "This is a test comment", "username": "test user"}], 
  "content": "How to use java ?", "createdBy": "Test user"}
  */

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const {content, createdBy, postId} = this.props.postData;
    return (
      <Card
        style={{...styles.postCard}}
        onPress={() => this.props.viewPost(postId)}>
        <Card.Title
          title={content}
          subtitle={<SubTitle {...this.props} />}
          titleNumberOfLines={3}
          titleStyle={{
            fontSize: 16,
            paddingHorizontal: '8%',
            color: '#323232',
            paddingRight: '6%',
          }}
          subtitleStyle={{
            paddingTop: '2%',
            paddingHorizontal: '8%',
            color: '#323232',
            width: '100%',
          }}
          left={props => (
            <Avatar.Text label={getInitials(createdBy)} {...props} size={55} />
          )}></Card.Title>
      </Card>
    );
  }
}

const SubTitle = props => {
  const {comments} = props.postData;

  return (
    <View
      style={{
        ...styles.container,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: 'transparent',
        marginTop: 5,
      }}>
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <Icon
          name="cards-heart"
          icon="cards-heart"
          color={'#323232'}
          size={15}
        />
        <Text></Text>
      </View>
      <Title style={{color: 'transparent'}}>___</Title>
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <Icon name="comment" icon="comment" color={'#323232'} size={15} />
        <Text> {comments ? comments.length : 0}</Text>
      </View>
    </View>
  );
};
