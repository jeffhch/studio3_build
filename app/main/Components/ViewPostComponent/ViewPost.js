import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Text,
  Button,
  Title,
  Paragraph,
  Avatar,
  Divider,
  Card,
  List,
  TextInput,
} from 'react-native-paper';
import {Actions} from '../../../Constants';
import {
  storeUserDataToFireStore,
  updateCommentsOnPost,
} from '../../_services/_storageSorvice';
import {getInitials} from '../../_services/_utilService';
import styles from './ViewPost.styles';

export default class ViewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPostData: false,
      postData: null,
      userNewComment: '',
      hasUserData: false,
      logedInUserData: null,
    };
  }

  onCommentChange = text => {
    this.setState({userNewComment: text});
  };

  addCommentToScreen = newComment => {
    const {postData} = this.state;
    let copyOfPostData = {...postData};
    let copyOfPostDataComments = [...copyOfPostData.comments];
    copyOfPostDataComments.push(newComment);
    copyOfPostData['comments'] = [...copyOfPostDataComments];
    this.setState(
      {
        postData: {...copyOfPostData},
        userNewComment: '',
      },
      () => this.updateUsersUqCoins(),
    );
  };

  updateUsersUqCoins = () => {
    const {logedInUserData} = this.state;

    console.log(Actions.UPDATE);

    storeUserDataToFireStore(logedInUserData.id, Actions.UPDATE, null, null)
      .then(response => {
        console.log('--- Added uq coins to user ----');
      })
      .catch(err => {
        console.log('----Problem adding Uq Coins to user ------------');
      });
  };

  onCommentSubmit = () => {
    const {userNewComment, postData} = this.state;
    const {username} = this.props.userDataFromFireStore;
    const postableComment = userNewComment.trim();

    if (postableComment && postableComment.length > 0) {
      const newComment = {
        username,
        comment: postableComment,
      };

      this.addCommentToScreen(newComment);
      updateCommentsOnPost(postData.postId, newComment)
        .then(response => {})
        .catch(err => {});
    }
  };

  setPostData = () => {
    const {route, userDataFromFireStore} = this.props;

    if (route) {
      if (route['params'] && route['params']['post']) {
        this.setState({
          hasPostData: true,
          postData: route.params.post,
          hasUserData: true,
          logedInUserData: userDataFromFireStore,
        });
        return;
      }
      return;
    }
    this.setState({
      hasPostData: false,
      postData: null,
      hasUserData: false,
      logedInUserData: null,
    });
  };

  componentDidMount() {
    this.setPostData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.hasPostData !== this.state.hasPostData &&
      this.state.hasPostData
    ) {
      this.setPostData();
    }
  }

  render() {
    console.log('------ View post------');
    console.log(this.props);

    const {postData, hasPostData, userNewComment, hasUserData} = this.state;
    return (
      <>
        {hasPostData && (
          <ScrollView style={{...styles.container}}>
            <View
              style={{
                ...styles.container,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '3%',
                paddingHorizontal: '5%',
              }}>
              <Title style={{marginTop: '5%', marginBottom: '2%'}}>
                {postData.content}
              </Title>
              <Paragraph style={{marginBottom: '5%'}}>
                {postData.description}
              </Paragraph>
              <Divider style={{backgroundColor: '#000', width: '100%'}} />
            </View>
            <View
              style={{
                ...styles.container,
                flexDirection: 'column',
                padding: '0%',
                paddingHorizontal: '5%',
              }}>
              {hasUserData && (
                <TextInput
                  placeholder="Comment..."
                  label="Enter you comment here ..."
                  style={{
                    backgroundColor: 'transparent',
                    paddingVertical: 0,
                    marginBottom: '3%',
                  }}
                  right={
                    userNewComment && userNewComment.trim().length > 0 ? (
                      <TextInput.Icon
                        name="right"
                        onPress={this.onCommentSubmit}
                        size={20}
                      />
                    ) : (
                      <TextInput.Icon name="plussquareo" size={20} />
                    )
                  }
                  value={this.state.userNewComment}
                  onChangeText={text => this.onCommentChange(text)}
                />
              )}
              <Title style={{color: 'rgba(0,0,0,0.5)', fontSize: 15}}>
                comments :
              </Title>

              <CommentCard {...this.state} />
            </View>
          </ScrollView>
        )}
      </>
    );
  }
}

const CommentCard = props => {
  const {comments} = props.postData;

  return (
    <>
      {comments && comments.length > 0 ? (
        <List.Section>
          <ListItem {...props} />
        </List.Section>
      ) : (
        <Title style={{color: 'rgba(0,0,0,0.5)'}}>
          No comments yet on this post
        </Title>
      )}
    </>
  );
};

const ListItem = props => {
  const {comments} = props.postData;

  return (
    <>
      {comments.map((eachComment, index) => (
        <List.Item
          key={'comment_' + index}
          title={eachComment.username}
          description={eachComment.comment}
          descriptionNumberOfLines={20}
          left={() => (
            <Avatar.Text
              label={getInitials(eachComment.username)}
              {...props}
              style={{marginTop: '3%'}}
              size={40}
            />
          )}
        />
      ))}
    </>
  );
};

// <Card style={styles.commentCard} key={'comment_' + index}>
//   <Card.Title
//     title={eachComment.username}
//     titleNumberOfLines={3}
//     titleStyle={{
//       fontSize: 16,
//       color: '#323232',
//       paddingRight: '6%',
//     }}
//     subtitleStyle={{
//       paddingTop: '2%',
//       paddingHorizontal: '8%',
//       color: '#323232',
//       width: '100%',
//     }}
//     left={props => (
//       <Avatar.Text
//         label={getInitials(eachComment.username)}
//         {...props}
//         size={35}
//       />
//     )}
//   />
//   <Card.Content style={{paddingHorizontal: '5%'}}>
//     <Paragraph>{eachComment.comment}</Paragraph>
//   </Card.Content>
// </Card>
