import styles from './Login.styles';
import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Button,
  Text,
  TextInput,
  Title,
  ActivityIndicator,
} from 'react-native-paper';
import {Formik} from 'formik';
import {loginValidationSchema} from '../ValidationSchema';
import HelperText from '../HelperTextComponent/HelperText';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  attemptLogin = values => {
    this.props.attemptLogin(values);
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
        }}>
        <ScrollView style={{flexDirection: 'column', padding: '8%', flex: 1}}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={values => {
              this.attemptLogin(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
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
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  propertyToValidateboardType="email-address"
                />
                <HelperText
                  errors={errors}
                  touched={touched}
                  propertyToValidate={'email'}
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
                  <Text style={{color: '#fff'}}>Sign in</Text>
                  
                </Button>
              </>
            )}
          </Formik>

          <Title
            style={{
              width: '100%',
              marginTop: '7%',
              fontSize: 15,
            }}>
            Forgot password ?
          </Title>
        </ScrollView>
      </View>
    );
  }
}
