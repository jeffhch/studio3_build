import {Dimensions} from 'react-native';

export const DeviceConfig = Object.freeze({
  WINDOW_HEIGHT: Dimensions.get('window').height,
  SCREEN_HEIGHT: Dimensions.get('screen').height,
  WINDOW_WIDTH: Dimensions.get('window').width,
});

export const Actions = Object.freeze({
  ADD: 'ADD',
  UPDATE: 'UPDATE',
});

export const Collections = Object.freeze({
  USERS: 'users',
  POSTS: 'posts',
});
