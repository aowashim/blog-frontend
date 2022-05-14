import * as yup from 'yup'

const regExAssamese =
  /^[\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09AF\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FE\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u000A\u0964]*$/
const asCharValidMsg = 'Only Assamese characters are allowed.'

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

export const editProfileValidation = yup.object({
  name: yup.string().required('Name is required.'),
  city: yup.string().required('City is required.'),
  about: yup
    .string()
    .required('About is required.')
    .max(200, 'Must be less than 200 characters.'),
})

export const postValidation = yup.object({
  title: yup
    .string()
    .matches(regExAssamese, asCharValidMsg)
    .required('Title is required.')
    .max(50, 'Title must be less than 50 characters.'),
  description: yup
    .string()
    .matches(regExAssamese, asCharValidMsg)
    .max(500, 'Description must be less than 500 characters.'),
  url: yup
    .string()
    .url('Invalid url.')
    .max(200, 'Url must be less than 200 characters.'),
  catg: yup
    .string()
    .matches(regExAssamese, asCharValidMsg)
    .max(50, 'Category must be less than 50 characters.'),
})

export const searchValidation = yup.object({
  searchQuery: yup.string().required('This field is required.'),
})
