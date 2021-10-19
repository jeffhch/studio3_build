import * as yup from 'yup';

const baseValidationSchema = {
  email: yup
    .string()
    .email('Please enter valid email !!!')
    .required('Email is required field !!!'),

  password: yup
    .string()
    .min(7, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
};

export const loginValidationSchema = yup
  .object()
  .shape({...baseValidationSchema});

export const registerValidationSchema = yup.object().shape({
  ...baseValidationSchema,
  username: yup.string().required('Username is required field !!!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match !!!')
    .required('Confirm password is required'),
});
