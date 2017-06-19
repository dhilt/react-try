import React, { Component } from 'react';
import { Form, Control, actions, Errors } from 'react-redux-form/immutable';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { storeHelper } from 'helpers/store';

@connect(state => ({
  newArticle: state.admin.newArticle
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

  handleSubmit(values) {
    console.log('Submit-button event!');
    console.log(this.props.newArticle.get('title'));
  }

  render() {
    let nowDate = new Date();
    return (
      <div>
        <h2>Route for creating articles...(only for admin)</h2>
        { 'newArticle state is ' + (this.props.isWorking ? 'accessible' : 'not accessible') }
        <Form
          model='newArticle'
          onSubmit={(values) => this.handleSubmit(values)}
          className='ArticleForm'
        >
          <label>Date:</label>
          <Control.text model='newArticle.date' value={nowDate}
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}} />
          <Errors className='errors' model='newArticle.date' messages={{
            required: 'Text is required '}} />

          <label>Title:</label>
          <Control.text model='newArticle.title'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}} />
          <Errors className='errors' model='newArticle.title' messages={{
            required: 'Text is required /',
            minLength: ' Must be 10 characters or more '}} />

          <label>Description:</label>
          <Control.text model='newArticle.description'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}} />
          <Errors className='errors' model='newArticle.description' messages={{
            required: 'Text is required /',
            minLength: ' Must be 10 characters or more '}} />

          <label>Image:</label>
          <Control.text model='newArticle.image'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 5}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 5}} />
          <Errors className='errors' model='newArticle.image' messages={{
            required: 'Text is required /',
            minLength: ' Must be 5 characters or more '}} />

          <label>Text:</label>
          <Control.text model='newArticle.text'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 100}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 100}} />
          <Errors className='errors' model='newArticle.text' messages={{
            required: 'Text is required /',
            minLength: ' Must be 100 characters or more '}} />

          <button onClick={() => this.handleSubmit()} type='submit'>Сохранить!</button>
        </Form>
      </div>
    );
  }
}
