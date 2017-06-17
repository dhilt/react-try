import React, { Component } from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { storeHelper } from 'helpers';

@connect(state => ({
  initialized: state.admin.common.get('initialized')
}))
export default class NewArticle extends Component {
  static propTypes = {
    dispatch: PropTypes.func
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
    console.log(values);
  }

  handleUpdate(form) {
//    console.log(form);
  }

  handleSubmit(values) {
    console.log('Submit-button event!');
  }

  render() {
    let date = new Date();
    return (
      <div>
        <h2>Route for creating articles...(only for admin)</h2>
        { this.props.initialized ? 'init' : 'no-init' }
        <LocalForm
          onUpdate={(form) => this.handleUpdate(form)}
          onChange={(values) => this.handleChange(values)}
          onSubmit={(values) => this.handleSubmit(values)}
          initialState={{ date: date }}
          className='ArticleForm'
        >
          <label>Date:</label>
          <Control.text model='.date' validators={{
                                      required: (val) => val && val.length}} required />
          <label>Title:</label>
          <Control.text model='.title' validators={{
                                       required: (val) => val && val.length,
                                       length: (val) => val && val.length > 10 && val.length < 60}} required />
          <label>Description:</label>
          <Control.text model='.description' validators={{
                                             required: (val) => val && val.length,
                                             length: (val) => val && val.length > 10 && val.length < 150}} required />
          <label>Image:</label>
          <Control.text model='.image' validators={{
                                       required: (val) => val && val.length}} required />
          <label>Text:</label>
          <Control.text model='.text' validators={{
                                      required: (val) => val && val.length,
                                      length: (val) => val && val.length > 100}} required />
          <button>Сохранить!</button>
        </LocalForm>
      </div>
    );
  }
}
