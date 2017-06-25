import React, { Component } from 'react'
import { Form, Control, Errors } from 'react-redux-form/immutable'
import MyDatepickerInput from './datepicker'

let getErrors = (token, options) => {
  let result = {}
  if(options.required) {
    result.required = token + ' is required'
  }
  if(options.minLength) {
    result.minLength = 'Must be ' + options.minLength + ' characters or more'
  }
  if(options.dateFormat) {
    result.dateFormat = token + ' is invalid!'
  }
  return result
}

export const ArticleForm = props => {
  const model = String(props.model)
  return (
    <Form
      model={String(model)}
      className='ArticleForm'>

      <label>Date</label>
      <MyDatepickerInput model={model + '.date'} />
      <Errors className='errors'
        model={model + '.date'}
        messages={getErrors('Date', { required: true, dateFormat: true})}/>

      <label>Title</label>
      <Control.text model={model + '.title'}
        validators={{
          required: (val) => !!val,
          minLength: (val) => val && val.length > 10
        }}/>
      <Errors className='errors'
        model={model + '.title'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Title', { required: true, minLength: 10})}/>

      <label>Description</label>
      <Control.text model={model + '.description'}
        validators={{
          required: (val) => !!val,
          minLength: (val) => val && val.length > 10
        }}/>
      <Errors className='errors'
        model={model + '.description'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Description', { required: true, minLength: 10})}/>

      <label>Image</label>
      <Control.text model={model + '.image'}
        validators={{
          required: (val) => !!val,
          minLength: (val) => val && val.length > 5
        }}/>
      <Errors className='errors'
        model={model + '.image'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Image', { required: true, minLength: 5})}/>

      <label>Text</label>
      <Control.text model={model + '.text'}
        validators={{
          required: (val) => !!val,
          minLength: (val) => val && val.length > 50
        }}/>
      <Errors className='errors'
        model={model + '.text'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Text', { required: true, minLength: 50})}/>

      <button
        onClick={props.onSubmit}
        disabled={props.pending || props.pristine || !props.valid}
        type='submit'>
          Сохранить!
      </button>
    </Form>
  )
}
