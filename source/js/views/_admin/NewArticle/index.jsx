import React, { Component } from 'react';
import { Form, Control, actions, Errors } from 'react-redux-form/immutable';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { storeHelper } from 'helpers/store';

@connect(state => ({
  newArticle: state.admin.newArticle,
  forms: state.admin.forms
}))
export default class NewArticle extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    storeHelper.dispatchSetAdminReducerAction();
  }

  handleSubmit() {
    console.log('Submit-button event!');
    console.log(this.props.newArticle.get('date'));
    // todo : trigger generate and send POST action
  }

  render() {
    let nowDate = new Date();
    let newArticleForm = this.props.forms.newArticle.$form;
    let pristine = newArticleForm && newArticleForm.pristine;
    let valid = newArticleForm && newArticleForm.valid;

    return (
      <div>
        <h2>Route for creating articles...(only for admin)</h2>
        <Form
          model='newArticle'
          className='ArticleForm'
        >
          <label>Date:</label>
          <Control.text model='newArticle.date' value={nowDate}
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}} />
          <Errors className='errors' model='newArticle.date' show='touched' messages={{
            required: 'Text is required '}} />

          <label>Title:</label>
          <Control.text model='newArticle.title'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}} />
          <Errors className='errors' model='newArticle.title' show='touched' messages={{
            required: 'Text is required /',
            minLength: ' Must be 10 characters or more '}} />

          <label>Description:</label>
          <Control.text model='newArticle.description'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}} />
          <Errors className='errors' model='newArticle.description' show='touched' messages={{
            required: 'Text is required /',
            minLength: ' Must be 10 characters or more '}} />

          <label>Image:</label>
          <Control.text model='newArticle.image'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 5}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 5}} />
          <Errors className='errors' model='newArticle.image' show='touched' messages={{
            required: 'Text is required /',
            minLength: ' Must be 5 characters or more '}} />

          <label>Text:</label>
          <Control.text model='newArticle.text'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 100}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 100}} />
          <Errors className='errors' model='newArticle.text' show='touched' messages={{
            required: 'Text is required /',
            minLength: ' Must be 100 characters or more '}} />

          <button
            onClick={() => this.handleSubmit()}
            disabled={pristine || !valid}
            type='submit'>
              Сохранить!
          </button>
        </Form>
      </div>
    );
  }
}
