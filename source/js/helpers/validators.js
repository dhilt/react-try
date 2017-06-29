let is = (val) => val !== undefined

let validate = {
  required: (val) => !!val,

  minLength: (options) => (val) => val && val.length > options.minLength,

  date: (date) => {
    let isValid = false
    if (!(date instanceof Date)) {
      return false
    }
    let matches = date.toISOString().split(/-|T|:/)
    if (!matches) {
      return false
    }
    let d = matches[2]
    let m = matches[1] - 1
    let y = matches[0]
    let composedDate = new Date(y, m, d)
    return composedDate.getDate() == d && composedDate.getMonth() == m && composedDate.getFullYear() == y
  }
}

let getValidators = (options, val) => {
  let result = {}
  if (options.required) {
    result.required = is(val) ? () => validate.required(val) : validate.required
  }
  if (options.minLength) {
    result.minLength = is(val) ? () => validate.minLength(options)(val) : validate.minLength(options)
  }
  if (options.dateFormat) {
    result.dateFormat = is(val) ? () => validate.date(val) : validate.date
  }
  return result
}

export const validators = {
  date: getValidators({ required: true, dateFormat: true }),
  title: getValidators({ required: true, minLength: 10 }),
  description: getValidators({ required: true, minLength: 10 }),
  image: getValidators({ required: true, minLength: 5 }),
  text: getValidators({ required: true, minLength: 50 })
}

export const validatorsVal = {
  date: (val) => getValidators({ required: true, dateFormat: true }, val),
  title: (val) => getValidators({ required: true, minLength: 10 }, val),
  description: (val) => getValidators({ required: true, minLength: 10 }, val),
  image: (val) => getValidators({ required: true, minLength: 5 }, val),
  text: (val) => getValidators({ required: true, minLength: 50 }, val)
}
