import React, {Component} from 'react';
import {View, ScrollView, TextInput as RNTextInput} from 'react-native';
import {
  Text,
  Card,
  Paragraph,
  Title,
  Avatar,
  Button,
  FAB,
  Modal,
  Portal,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {storeNewPostToFirebase} from '../../_services/_storageSorvice';
import styles from './CreatePostComponent.styles';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      title: '',
      description: '',
    };
  }

  hideModal = () => {
    this.setState({isModalVisible: false});
  };

  showModal = () => {
    this.setState({isModalVisible: true});
  };

  getQuiqueIdForNewPost() {
    return (
      new Date().getTime().toString(36) + Math.random().toString(32).slice(2)
    );
  }

  sendPostToFireStore = () => {
    const {title, description} = this.state;
    const {userName} = this.props;
    let newPOstToStore = {
      comments: [],
      content: title,
      description,
      createdBy: userName,
    };
    storeNewPostToFirebase(newPOstToStore)
      .then(response => {
        if (response) {
          this.props.addPostToScreen({
            postId: this.getQuiqueIdForNewPost(),
            ...newPOstToStore,
          });
        }
      })
      .catch(err => {});
  };

  submitPost = () => {
    const {title, description} = this.state;
    if (title && description && this.props.userName) {
      this.sendPostToFireStore();
      this.setState({isModalVisible: false});
    }
  };

  onChangeText = (text, stateVariable) => {
    this.setState({
      [stateVariable]: text,
    });
  };

  render() {
    const {title, description} = this.state;
    return (
      <>
        <Portal>
          <Modal
            visible={this.state.isModalVisible}
            onDismiss={this.hideModal}
            contentContainerStyle={{
              backgroundColor: 'transparent',
              marginHorizontal: '8%',
              elevation: 3,
            }}>
            <ScrollView
              style={{
                height: '60%',
                backgroundColor: '#fff',
                paddingHorizontal: '5%',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                elevation: 1,
              }}>
              <RNTextInput
                placeholder="Title"
                style={{
                  backgroundColor: 'transparent',
                  color: '#000',
                  borderBottomWidth: 1,
                }}
                placeholderTextColor="rgba(0,0,0,0.5)"
                selectionColor="#512378"
                value={title}
                onChangeText={text => this.onChangeText(text, 'title')}
              />

              <RNTextInput
                multiline
                placeholder="Enter you description ..."
                style={{backgroundColor: 'transparent', color: '#000'}}
                placeholderTextColor="rgba(0,0,0,0.5)"
                selectionColor="#512378"
                value={description}
                onChangeText={text => this.onChangeText(text, 'description')}
              />
            </ScrollView>

            <Button
              mode="contained"
              style={{
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                elevation: 0,
              }}
              onPress={this.submitPost}>
              Post
            </Button>
          </Modal>
        </Portal>
        {!this.state.isModalVisible && (
          <FAB
            style={{...styles.fab}}
            icon={'plus'}
            small
            onPress={this.showModal}
          />
        )}
      </>
    );
  }
}
