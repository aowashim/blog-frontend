import * as yup from 'yup'

export const signInValidation = yup.object({
  email: yup
    .string()
    .email('The email is not valid.')
    .required('Email is required.'),
  pwrd: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be atleast 8 characters.')
    .max(16, 'Password must be atmost 16 characters.'),
})

export const signUpValidation = yup.object({
  email: yup
    .string()
    .email('The email is not valid.')
    .required('Email is required.'),
  pwrd: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be atleast 8 characters.')
    .max(16, 'Password must be atmost 16 characters.'),
  name: yup.string().required('Name is required.'),
  city: yup.string().required('City is required.'),
  about: yup
    .string()
    .required('About is required.')
    .max(200, 'Must be less than 200 characters.'),
})
