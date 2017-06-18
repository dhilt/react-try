import React, { Component } from 'react';
import { Form, LocalForm, Control, actions, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { storeHelper } from 'helpers/store';

@connect(state => ({
  isWorking: state.admin.newArticle.get('isWorking'),
  date: state.admin.newArticle.get('date'),
  title: state.admin.newArticle.get('title'),
  description: state.admin.newArticle.get('description'),
  image: state.admin.newArticle.get('image'),
  text: state.admin.newArticle.get('text'),
  newArticle: state.admin.newArticle
}))
export default class NewArticle extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    date: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    newArticle: PropTypes.object
  }

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    storeHelper.dispatchSetAdminReducerAction();
  }

  handleChange(values) {
//    console.log(values);
  }

  handleUpdate(form) {
//    console.log(form);
  }

  handleSubmit(values) {
    console.log('Submit-button event!');
    console.log(values);
  }

  render() {
    let nowDate = new Date();
    const { dispatch, newArticle } = this.props;
    let { date, title, description, image, text } = this.props; //??
    return (
      <div>
        <h2>Route for creating articles...(only for admin)</h2>
        { 'newArticle state is ' + (this.props.isWorking ? 'accessible' : 'not accessible') }
        <LocalForm
          model='newArticle'
          onUpdate={(form) => this.handleUpdate(form)}
          onChange={(values) => this.handleChange(values)}
          onSubmit={(values) => this.handleSubmit(values)}
          initialState={{ date: nowDate }}
          className='ArticleForm'
        >
          <label>Date:</label>
          <Control.text model='.date'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}}
            onChange={(e) => dispatch(actions.change('newArticle.date', e))}
            onBlur={() => dispatch(actions.validate('newArticle.date', {
              required: (val) => val && val.length}))} />
          <Errors className='errors' model='.date' show='touched' messages={{
            required: 'Text is required'}} />

          <label>Title:</label>
          <Control.text model='.title'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}}
            onChange={(e) => dispatch(actions.change('newArticle.title', e))}
            onBlur={() => dispatch(actions.validate('newArticle.title', {
              required: (val) => val && val.length,
              minLength: (val) => val && val.length > 10}))} />
          <Errors className='errors' model='.title' show='touched' messages={{
            required: 'Text is required',
            minLength: 'Must be 10 characters or more'}} />

          <label>Description:</label>
          <Control.text model='.description'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 10}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 10}}
            onChange={(e) => dispatch(actions.change('newArticle.description', e))}
            onBlur={() => dispatch(actions.validate('newArticle.description', {
              required: (val) => val && val.length,
              minLength: (val) => val && val.length > 10}))} />
          <Errors className='errors' model='.description' show='touched' messages={{
            required: 'Text is required',
            minLength: 'Must be 10 characters or more'}} />

          <label>Image:</label>
          <Control.text model='.image'
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 5}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 5}}
            onChange={(e) => dispatch(actions.change('newArticle.image', e))}
            onBlur={() => dispatch(actions.validate('newArticle.image', {
              required: (val) => val && val.length,
              minLength: (val) => val && val.length > 5}))} />
          <Errors className='errors' model='.image' show='touched' messages={{
            required: 'Text is required',
            minLength: 'Must be 5 characters or more'}} />

          <label>Text:</label>
          <Control.text model='.text' 
            validators={{required: (val) => val && val.length, length: (val) => val && val.length > 100}}
            errors={{required: (val) => !val || !val.length, minLength: (val) => !val || val.length < 100}}
            onChange={(e) => dispatch(actions.change('newArticle.text', e))}
            onBlur={() => dispatch(actions.validate('newArticle.text', {
              required: (val) => val && val.length,
              minLength: (val) => val && val.length > 100}))} />
          <Errors className='errors' model='.text' show='touched' messages={{
            required: 'Text is required',
            minLength: 'Must be 100 characters or more'}} />

          <button type='submit'>Сохранить!</button>
        </LocalForm>
      </div>
    );
  }
}
