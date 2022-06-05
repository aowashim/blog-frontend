import * as yup from 'yup'

const regExAssamese =
  /^[\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09AF\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FE\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u000A\u0964]*$/
const asCharValidMsg = 'কেৱল অসমীয়া আখৰ অনুমোদিত'

export const signInValidation = yup.object({
  userName: yup
    .string()
    .required('Username প্ৰয়োজনীয়')
    .matches(/^[a-z0-9]+$/i, 'কেৱল alphanumeric আখৰ অনুমোদিত')
    .min(4, 'Username অতি কমেও 4 টা আখৰৰ হব লাগিব')
    .max(15, 'সৰ্বাধিক 15 টা আখৰ অনুমোদিত'),
  pwrd: yup
    .string()
    .required('পাছৱৰ্ড প্ৰয়োজনীয়')
    .min(8, 'পাছৱৰ্ড অতি কমেও 8 টা আখৰৰ হব লাগিব')
    .max(16, 'সৰ্বাধিক 16 টা আখৰ অনুমোদিত'),
})

export const signUpValidation = yup.object({
  userName: yup
    .string()
    .required('Username প্ৰয়োজনীয়')
    .matches(/^[a-z0-9]+$/i, 'কেৱল alphanumeric আখৰ অনুমোদিত')
    .min(4, 'Username অতি কমেও 4 টা আখৰৰ হব লাগিব')
    .max(15, 'সৰ্বাধিক 15 টা আখৰ অনুমোদিত'),
  pwrd: yup
    .string()
    .required('পাছৱৰ্ড প্ৰয়োজনীয়')
    .min(8, 'পাছৱৰ্ড অতি কমেও 8 টা আখৰৰ হব লাগিব')
    .max(16, 'সৰ্বাধিক 16 টা আখৰ অনুমোদিত'),
  name: yup
    .string()
    .required('নাম প্ৰয়োজনীয়')
    .matches(regExAssamese, asCharValidMsg),
  city: yup
    .string()
    .required('নগৰ প্ৰয়োজনীয়')
    .matches(regExAssamese, asCharValidMsg),
  about: yup
    .string()
    .matches(regExAssamese, asCharValidMsg)
    .required('আপোনাৰ বিষয়ে প্ৰয়োজনীয়')
    .max(100, 'সৰ্বাধিক 100 টা আখৰ অনুমোদিত'),
})

export const editProfileValidation = yup.object({
  name: yup
    .string()
    .required('নাম প্ৰয়োজনীয়')
    .matches(regExAssamese, asCharValidMsg),
  city: yup
    .string()
    .required('নগৰ প্ৰয়োজনীয়')
    .matches(regExAssamese, asCharValidMsg),
  about: yup
    .string()
    .matches(regExAssamese, asCharValidMsg)
    .required('আপোনাৰ বিষয়ে প্ৰয়োজনীয়')
    .max(100, 'সৰ্বাধিক 100 টা আখৰ অনুমোদিত'),
})

export const postValidation = yup.object({
  title: yup
    .string()
    .matches(regExAssamese, asCharValidMsg)
    .required('শীৰ্ষক প্ৰয়োজনীয়')
    .max(50, 'শীৰ্ষক 50 টা আখৰতকৈ কম হব লাগিব'),
  description: yup
    .string()
    .matches(regExAssamese, asCharValidMsg)
    .max(500, 'বিৱৰণ 500 টা আখৰতকৈ কম হব লাগিব'),
  url: yup
    .string()
    .url('URL বৈধ নহয়')
    .max(200, 'URL 200 টা আখৰতকৈ কম হব লাগিব'),
  catg: yup
    .string()
    .matches(regExAssamese, asCharValidMsg)
    .max(50, 'শ্ৰেণী 50 টা আখৰতকৈ কম হব লাগিব'),
})

export const searchValidation = yup.object({
  searchQuery: yup.string().required('Query প্ৰয়োজনীয়'),
})

export const commentValidation = yup.object({
  comment: yup
    .string()
    .required('মন্তব্য় প্ৰয়োজনীয়')
    .matches(regExAssamese, asCharValidMsg)
    .max(200, 'সৰ্বাধিক ২০০ টা আখৰ অনুমোদিত'),
})
