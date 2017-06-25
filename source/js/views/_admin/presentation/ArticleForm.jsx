import React, { Component } from 'react';
import { Form, Control, Errors } from 'react-redux-form/immutable';
import MyDatepickerInput from './datepicker';

export const ArticleForm = props => {
  return (
    <Form
      model={String(props.model)}
      className='ArticleForm'
    >
      <label>Date:</label>
      <MyDatepickerInput model={props.model + '.date'} />
      <Errors className='errors' model={props.model + '.date'} messages={{
        required: 'Date is required /',
        dateFormat: ' Date is invalid! '}} />

      <label>Title:</label>
      <Control.text model={props.model + '.title'}
        validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
        errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}} />
      <Errors className='errors' model={props.model + '.title'} show={{touched: true, pristine: false}} messages={{
        required: 'Text is required /',
        minLength: ' Must be 10 characters or more '}} />

      <label>Description:</label>
      <Control.text model={props.model + '.description'}
        validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
        errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}} />
      <Errors className='errors' model={props.model + '.description'} show={{touched: true, pristine: false}} messages={{
        required: 'Text is required /',
        minLength: ' Must be 10 characters or more '}} />

      <label>Image:</label>
      <Control.text model={props.model + '.image'}
        validators={{required: (val) => val && val.length, length: (val) => val && val.length > 5}}
        errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 5}} />
      <Errors className='errors' model={props.model + '.image'} show={{touched: true, pristine: false}} messages={{
        required: 'Text is required /',
        minLength: ' Must be 5 characters or more '}} />

      <label>Text:</label>
      <Control.text model={props.model + '.text'}
        validators={{required: (val) => val && val.length, length: (val) => val && val.length > 100}}
        errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 100}} />
      <Errors className='errors' model={props.model + '.text'} show={{touched: true, pristine: false}} messages={{
        required: 'Text is required /',
        minLength: ' Must be 100 characters or more '}} />

      <button
        onClick={props.onSubmit}
        disabled={props.pending || props.pristine || !props.valid}
        type='submit'>
          Сохранить!
      </button>
    </Form>
  );
}
