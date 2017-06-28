import React, { Component } from 'react'
import { Form, Control, Errors } from 'react-redux-form/immutable'
import MyDatepickerInput from '../datepicker'

let getValidators = (options) => {
  let result = {}
  if(options.required) {
    result.required = (val) => !!val
  }
  if(options.minLength) {
    result.minLength = (val) => val && val.length > options.minLength
  }
  return result  
}

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
  const localModel = model + '.article'
  return (
    <Form
      model={String(model)}
      className='ArticleForm'>

      <label>Date</label>
      <MyDatepickerInput model={localModel + '.date'} />
      <Errors className='errors'
        model={localModel + '.date'}
        messages={getErrors('Date', { required: true, dateFormat: true})}/>

      <label>Title</label>
      <Control.text model={localModel + '.title'}
        validators={getValidators({ required: true, minLength: 10})}/>
      <Errors className='errors'
        model={localModel + '.title'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Title', { required: true, minLength: 10})}/>

      <label>Description</label>
      <Control.text model={localModel + '.description'}
        validators={getValidators({ required: true, minLength: 10})}/>
      <Errors className='errors'
        model={localModel + '.description'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Description', { required: true, minLength: 10})}/>

      <label>Image</label>
      <Control.text model={localModel + '.image'}
        validators={getValidators({ required: true, minLength: 5})}/>
      <Errors className='errors'
        model={localModel + '.image'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Image', { required: true, minLength: 5})}/>

      <label>Text</label>
      <Control.textarea model={localModel + '.text'}
        validators={getValidators({ required: true, minLength: 50})}/>
      <Errors className='errors'
        model={localModel + '.text'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Text', { required: true, minLength: 50})}/>

      <div>
        <button
          onClick={props.onSubmit}
          disabled={props.pending || props.pristine || !props.valid}
          type='submit'>
            Сохранить!
        </button>
      </div>
    </Form>
  )
}
