import React, { Component } from 'react';
import { Form, Control, Errors } from 'react-redux-form/immutable';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { createNewArticleAsync } from 'actions/_admin/newArticle';

import MyDatepickerInput from './datepicker';

@connect(state => ({
  newArticle: state.admin.newArticle,
  newArticleForm: state.admin.forms.newArticle,
  pending: state.admin.newArticle.get('pending')
}))
export default class NewArticle extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { dispatch } = this.props;
    dispatch(createNewArticleAsync());
  }

  render() {
    let { newArticleForm, pending } = this.props;
    let pristine = newArticleForm.$form && newArticleForm.$form.pristine;
    let valid = newArticleForm.$form && newArticleForm.$form.valid;

    return (
      <div>
        <h2>Route for creating articles...(only for admin)</h2>
        <Form
          model='newArticle'
          className='ArticleForm'
        >
          <label>Date:</label>
          <MyDatepickerInput model="newArticle.date" />

          <label>Title:</label>
          <Control.text model='newArticle.title'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}} />
          <Errors className='errors' model='newArticle.title' show={{touched: true, pristine: false}} messages={{
            required: 'Text is required /',
            minLength: ' Must be 10 characters or more '}} />

          <label>Description:</label>
          <Control.text model='newArticle.description'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}} />
          <Errors className='errors' model='newArticle.description' show={{touched: true, pristine: false}} messages={{
            required: 'Text is required /',
            minLength: ' Must be 10 characters or more '}} />

          <label>Image:</label>
          <Control.text model='newArticle.image'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 5}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 5}} />
          <Errors className='errors' model='newArticle.image' show={{touched: true, pristine: false}} messages={{
            required: 'Text is required /',
            minLength: ' Must be 5 characters or more '}} />

          <label>Text:</label>
          <Control.text model='newArticle.text'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 100}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 100}} />
          <Errors className='errors' model='newArticle.text' show={{touched: true, pristine: false}} messages={{
            required: 'Text is required /',
            minLength: ' Must be 100 characters or more '}} />

          <button
            onClick={() => this.handleSubmit()}
            disabled={pending || pristine || !valid}
            type='submit'>
              Сохранить!
          </button>
        </Form>
      </div>
    );
  }
}
