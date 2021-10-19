import React, {Component} from 'react';
import {View, StatusBar, ScrollView} from 'react-native';
import {ActivityIndicator, Searchbar, Text, Title} from 'react-native-paper';
import styles from './UQPosts.styles';
import {createStackNavigator} from '@react-navigation/stack';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import PostsCard from '../PostsCardComponent/PostsCard';
import CreatePost from '../CreatePostComponent/CreatePost';
import {
  getAllStoredPostsFromFirestore,
  listenToActiveStorage,
} from '../../_services/_storageSorvice';
import ViewPost from '../ViewPostComponent/ViewPost';

const UQPostStack = createStackNavigator();

class UQPostsClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      userId: null,
      userEmail: null,
      userName: null,
      hasUserData: false,
      allPosts: null,
      allPostsBackup: null,
      hasPostData: false,
    };
  }

  setUserDataToState = userData => {
    this.setState({
      userId: userData.id,
      userEmail: userData.email,
      userName: userData.username,
      hasUserData: true,
    });
  };

  setAllPosts = queryData => {
    if (queryData) {
      let allPosts = [];
      if (queryData.size > 0) {
        queryData.forEach(post => {
          const postDataFromFireStore = post.data();

          if (
            postDataFromFireStore &&
            postDataFromFireStore['content'] &&
            postDataFromFireStore['description'] &&
            postDataFromFireStore['createdBy']
          )
            allPosts.push({...postDataFromFireStore, postId: post.id});
        });
        if (allPosts && allPosts.length > 0) {
          this.setState({
            allPosts,
            allPostsBackup: [...allPosts],
            hasPostData: true,
          });
          return;
        }
        return;
      }
      this.setState({
        allPosts: null,
        allPostsBackup: null,
        hasPostData: false,
      });
    } //else
    //   getAllStoredPostsFromFirestore()
    //     .then(response => {
    //       let allPosts = [];
    //       if (response.size > 0) {
    //         response.forEach(post => {
    //           allPosts.push({...post.data(), postId: post.id});
    //         });
    //         this.setState({
    //           allPosts,
    //           allPostsBackup: [...allPosts],
    //           hasPostData: true,
    //         });
    //       } else
    //         this.setState({
    //           allPosts: null,
    //           allPostsBackup: null,
    //           hasPostData: false,
    //         });
    //     })
    //     .catch(() =>
    //       this.setState({
    //         allPosts: null,
    //         allPostsBackup: null,
    //         hasPostData: false,
    //       }),
    //     );
  };

  componentDidMount() {
    if (this.props.userDataFromFireStore) {
      this.setUserDataToState(this.props.userDataFromFireStore);
      listenToActiveStorage(this.setAllPosts);
    } else {
      this.setState({hasUserData: false});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userEmail !== this.state.userEmail && this.state.userEmail) {
      if (this.props.userDataFromFireStore) {
        this.setUserDataToState(this.props.userDataFromFireStore);
        listenToActiveStorage(this.setAllPosts);
      } else {
        this.setState({hasUserData: false});
      }
    }
  }

  searchQuery = () => {
    const {allPosts, searchQuery} = this.state;
    if (searchQuery.length >= 3) {
      const allPostsBackup = [...allPosts];

      if (allPosts && searchQuery) {
        const filteredSearch = allPostsBackup.filter(post =>
          post.content.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        if (filteredSearch) {
          this.setState({allPostsBackup: [...filteredSearch]});
          return;
        }
        return;
      }
    }
    this.setState({
      allPostsBackup: [...allPosts],
    });
  };

  onChangeSearch = query => {
    this.setState({searchQuery: query}, this.searchQuery);
  };

  viewPost = postId => {
    const thePostToView = this.state.allPostsBackup.filter(
      post => post.postId === postId,
    );
    if (thePostToView && thePostToView.length > 0)
      this.props.navigation.navigate('ViewPost', {post: thePostToView[0]});
  };

  addPostToScreen = newPostSent => {
    // const {allPosts, allPostsBackup} = this.state;
    // if (allPosts) {
    //   this.setState({
    //     allPosts: [...allPosts, newPostSent],
    //     allPostsBackup: [...allPostsBackup, newPostSent],
    //   });
    // }

    this.setAllPosts();
  };

  render() {
    const {hasUserData, hasPostData, allPostsBackup, userName} = this.state;
    return (
      <>
        <View
          style={{
            ...styles.container,
            height: '100%',
          }}>
          <Searchbar
            placeholder="Search some posts ...."
            clearIcon={() => (
              <EvilIcon name="close" icon="close" color={'#512378'} size={22} />
            )}
            icon={() => (
              <EvilIcon
                name="search"
                icon="search"
                color={'#512378'}
                size={25}
              />
            )}
            onChangeText={this.onChangeSearch}
            value={this.state.searchQuery}
          />

          {!hasPostData && (
            <View
              style={{
                ...styles.container,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={'#512378'} />
            </View>
          )}
          {hasPostData && allPostsBackup && (
            <ScrollView
              style={{
                ...styles.container,
                backgroundColor: 'transparent',
                paddingHorizontal: '5%',
                paddingTop: '7%',
              }}>
              {hasPostData && allPostsBackup ? (
                allPostsBackup.map((post, index) => (
                  <PostsCard
                    postData={post}
                    key={'post_' + index}
                    viewPost={this.viewPost}
                  />
                ))
              ) : (
                <Text>No Posts</Text>
              )}

              <Title style={{color: 'transparent'}}>Placeholder</Title>
            </ScrollView>
          )}
        </View>

        {hasUserData && (
          <CreatePost
            userName={userName}
            addPostToScreen={this.addPostToScreen}
          />
        )}
      </>
    );
  }
}

export default function UQPosts(props) {
  return (
    <>
      <StatusBar animated={true} backgroundColor="transparent" translucent />
      <UQPostStack.Navigator initialRouteName="UQPostStackScreen">
        <UQPostStack.Screen
          name="UQPostStackScreen"
          children={navigtorProps => (
            <UQPostsClassComponent {...navigtorProps} {...props} />
          )}
          options={{
            headerTitle: 'POST',
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
        <UQPostStack.Screen
          name="ViewPost"
          children={navigtorProps => <ViewPost {...navigtorProps} {...props} />}
          options={{
            headerTitle: 'POST',
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
      </UQPostStack.Navigator>
    </>
  );
}
