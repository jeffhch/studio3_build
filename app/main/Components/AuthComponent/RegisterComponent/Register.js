import styles from './Register.styles';
import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text, TextInput, Title} from 'react-native-paper';
import {Formik} from 'formik';
import {registerValidationSchema} from '../ValidationSchema';
import HelperText from '../HelperTextComponent/HelperText';

export default class Register extends Component {
  componentDidMount() {}

  goToSignInScreen = () => {
    if (this.props.navigation) this.props.navigation.navigate('Sign in');
  };

  attemptToRegister = values => {
    const {email, password, username} = values;
    this.props.attemptToRegister({email, password, username});
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
          padding: 0,
          margin: 0,
        }}>
        <ScrollView
          style={{
            flexDirection: 'column',
            padding: '8%',
            paddingBottom: 0,
            flex: 1,
          }}>
          <Formik
            validationSchema={registerValidationSchema}
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              username: '',
            }}
            onSubmit={values => this.attemptToRegister(values)}>
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              isValid,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  style={{width: '100%', backgroundColor: 'transparent'}}
                  placeholder="Username"
                  left={
                    <TextInput.Icon
                      name="user"
                      size={17}
                      color={'rgba(0,0,0,0.6)'}
                      style={{paddingLeft: 0, marginLeft: 0}}
                    />
                  }
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                <HelperText
                  errors={errors}
                  touched={touched}
                  propertyToValidate={'username'}
                />
                <TextInput
                  placeholder="Password"
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                  }}
                  left={
                    <TextInput.Icon
                      name="lock"
                      size={17}
                      color={'rgba(0,0,0,0.6)'}
                      style={{paddingLeft: 0, marginLeft: 0}}
                    />
                  }
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                <HelperText
                  errors={errors}
                  touched={touched}
                  propertyToValidate={'password'}
                />
                <TextInput
                  placeholder="Confirm Password"
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                  }}
                  left={
                    <TextInput.Icon
                      name="lock"
                      size={17}
                      color={'rgba(0,0,0,0.6)'}
                      style={{paddingLeft: 0, marginLeft: 0}}
                    />
                  }
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                <HelperText
                  errors={errors}
                  touched={touched}
                  propertyToValidate={'confirmPassword'}
                />
                <TextInput
                  placeholder="Student Email"
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                  }}
                  left={
                    <TextInput.Icon
                      name="mail"
                      size={17}
                      color={'rgba(0,0,0,0.6)'}
                      style={{paddingLeft: 0, marginLeft: 0}}
                    />
                  }
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <HelperText
                  errors={errors}
                  touched={touched}
                  propertyToValidate={'email'}
                />
                <Button
                  style={{
                    width: '100%',
                    paddingVertical: 6,
                    marginTop: '15%',
                    elevation: 0,
                  }}
                  mode="contained"
                  onPress={handleSubmit}
                  disabled={!isValid}>
                  <Text style={{color: '#fff'}}>Sign Up</Text>
                </Button>
              </>
            )}
          </Formik>

          <View style={{paddingBottom: '15%'}}>
            <Title
              onPress={this.goToSignInScreen}
              style={{
                width: '100%',
                marginTop: '7%',
                fontSize: 15,
              }}>
              Sign in
            </Title>
          </View>
        </ScrollView>
      </View>
    );
  }
}
