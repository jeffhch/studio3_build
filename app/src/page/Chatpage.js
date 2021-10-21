/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import 'dayjs/locale/en-au';
import { View, Text } from 'react-native';


export default function CustomChat({ navigation }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, how can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/110/any',
        },
      }, {
        _id: 0,
        text: 'Staff is online, you can talk your problem.',
        createdAt: new Date(),
        system: true,
        // Any additional custom parameters are passed through
      }
    ])
  }, []);
  const onSend = useCallback((msg = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
  }, []);


  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'black',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#ccc',
            marginRight: -45,
          }, left: {
            backgroundColor: 'lightblue',
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send
        {...props}
      >
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <Text style={{ color: '#0366d6', fontSize: 18 }}>Send</Text>
        </View>
      </Send>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showUserAvatar={true}
      locale={"en-au"}
      showAvatarForEveryMessage={true}
      renderBubble={renderBubble}
      placeholder={"Start Chat"}
      renderSend={renderSend}
      user={{
        _id: 3,
      }}
    />
  )
}


