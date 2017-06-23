import React, { Component } from 'react';
import { Form, Control, actions, Errors } from 'react-redux-form/immutable';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { setTimeArticle } from 'actions/_admin/newArticle';

@connect(state => ({
  newArticle: state.admin.newArticle,
  newArticleForm: state.admin.forms.newArticle
}))
export default class NewArticle extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDateChanged = this.onDateChanged.bind(this);
    this.state = {
      date: moment()
    };
  }

  componentWillMount() {
    this.props.dispatch(setTimeArticle(this.state.date._d));
  }

  handleSubmit() {
    console.log('Submit-button event!');
    console.log(this.props.newArticle.get('date'));
    // todo : trigger generate and send POST action
  }

  onDateChanged(date) {
    const { dispatch } = this.props;
    this.setState({ date });
    dispatch(setTimeArticle(date ? date._d : null));
    // this.props.newArticleForm.date.value ???
  }

  render() {
    let nowDate = new Date();
    let { newArticleForm } = this.props;
    let pristine = newArticleForm.$form && newArticleForm.$form.pristine;
    let valid = newArticleForm.$form && newArticleForm.$form.valid;

    const MyDatePicker = (props) => 
      <DatePicker
        dateFormat="DD MMM YYYY"
        todayButton="Today"
        selected={this.state.date}
        onChange={this.onDateChanged}
      />;

    return (
      <div>
        <h2>Route for creating articles...(only for admin)</h2>
        <Form
          model='newArticle'
          className='ArticleForm'
        >
          <label>Date:</label>
          <Control
            model="newArticle.date"
            component={MyDatePicker}
            value={this.state.date}
            validators={{required: (val) => val}}
            errors={{required: (val) => !val}}/>
          <Errors className='errors' model='newArticle.date' show={{touched: true, pristine: false}} messages={{
            required: 'Date is required /'}} />

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
            disabled={pristine || !valid}
            type='submit'>
              Сохранить!
          </button>
        </Form>
      </div>
    );
  }
}
