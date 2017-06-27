import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editArticleAsync } from 'actions/_admin/editArticle';
import { ArticleForm } from '../ArticleForm';

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
    dispatch(editArticleAsync());
  }

  render() {
    let { editArticleForm, pending, editArticle } = this.props;
    let pristine = editArticleForm.$form && editArticleForm.$form.pristine;
    let valid = editArticleForm.$form && editArticleForm.$form.valid;

    return (
      <div>
        <h2>Edit Article...(admin only)</h2>
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
