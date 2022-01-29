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

export const signInValidation11 = yup.object({
  altPhone: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .length(10, 'Must be exactly 10 digits'),
  pin: yup
    .string()
    .required('Pin code is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits'),
})
