import React from 'react';
import {HelperText as RNHelperText} from 'react-native-paper';

export default function HelperText({errors, touched, propertyToValidate}) {
  return (
    <RNHelperText
      type="error"
      style={{
        width: '100%',
        textAlign: 'left',
      }}
      visible={errors[propertyToValidate] && touched[propertyToValidate]}>
      {errors[propertyToValidate]}
    </RNHelperText>
  );
}
