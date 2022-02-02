import * as yup from 'yup'

export const signInValidation = yup.object({
  userName: yup
    .string()
    .required('Username is required.')
    .matches(/^[a-z0-9]+$/i, 'Only alphanumeric characters are allowed.')
    .min(4, 'Username must be atleast 4 characters.')
    .max(15, 'Username must be less than 15 characters.'),
  pwrd: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be atleast 8 characters.')
    .max(16, 'Password must be atmost 16 characters.'),
})

export const signUpValidation = yup.object({
  userName: yup
    .string()
    .required('Username is required.')
    .matches(/^[a-z0-9]+$/i, 'Only alphanumeric characters are allowed.')
    .min(4, 'Username must be atleast 4 characters.')
    .max(15, 'Username must be less than 15 characters.'),
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
