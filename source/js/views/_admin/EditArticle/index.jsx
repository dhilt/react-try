import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Errors } from 'react-redux-form/immutable';

import { editExistArticleAsync } from 'actions/_admin/editArticle';
import { ArticleForm } from '../presentation/ArticleForm';

@connect(state => ({
  editArticle: state.admin.editArticle,
  editArticleForm: state.admin.forms.editArticle,
  pending: state.admin.editArticle.get('pending')
}))
export default class EditArticle extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { dispatch } = this.props;
    dispatch(editExistArticleAsync());
  }

  render() {
    let { editArticleForm, pending, editArticle } = this.props;
    let pristine = editArticleForm.$form && editArticleForm.$form.pristine;
    let valid = editArticleForm.$form && editArticleForm.$form.valid;

    return (
      <div>
        <h2>Route for editing articles...(only for admin)</h2>

        <div className='formEditIdArticle'>
          <label>Edit Article Id:</label>
          <Control.text model='editArticle.idArticle'
            validators={{required: (val) => val && val.length, numberValid: (val) => val && !isNaN(parseFloat(val)) && isFinite(val)}}
            errors={{required: (val) => !val || !val.length, numberValid: (val) => !val || isNaN(parseFloat(val)) || !isFinite(val)}} />
          <Errors className='errors' model='editArticle.idArticle' show={{touched: true, pristine: false}} messages={{
            required: 'Number is required /',
            numberValid: ' Number is invalid '}} />
        </div>

        <ArticleForm
          onSubmit={this.handleSubmit}
          model={'editArticle'}
          pending={pending}
          pristine={pristine}
          valid={valid} />
      </div>
    );
  }
}
