import React, { Component } from 'react'
import { Form, Control, Errors } from 'react-redux-form/immutable'

import MyDatepickerInput from '../datepicker'
import { validators, validatorsVal } from 'helpers/validators'

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
      <MyDatepickerInput model={model + '.date'} value={props.data.date} validators={validatorsVal.date}/>
      <Errors className='errors'
        model={model + '.date'}
        messages={getErrors('Date', { required: true, dateFormat: true})}/>

      <label>Title</label>
      <Control.text model={model + '.title'}  value={props.data.title} validators={validators.title}/>
      <Errors className='errors'
        model={model + '.title'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Title', { required: true, minLength: 10})}/>

      <label>Description</label>
      <Control.text model={model + '.description'} value={props.data.description} validators={validators.description}/>
      <Errors className='errors'
        model={model + '.description'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Description', { required: true, minLength: 10})}/>

      <label>Image</label>
      <Control.text model={model + '.image'} value={props.data.image} validators={validators.image}/>
      <Errors className='errors'
        model={model + '.image'}
        show={{touched: true, pristine: false}}
        messages={getErrors('Image', { required: true, minLength: 5})}/>

      <label>Text</label>
      <Control.textarea model={model + '.text'} value={props.data.text} validators={validators.text}/>
      <Errors className='errors'
        model={model + '.text'}
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
