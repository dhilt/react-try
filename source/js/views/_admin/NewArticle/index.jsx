import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createArticleAsync } from 'actions/_admin/newArticle';
import { ArticleForm } from '../ArticleForm';

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
    dispatch(createArticleAsync());
  }

  render() {
    let { newArticleForm, pending, newArticle } = this.props;
    let pristine = newArticleForm.$form && newArticleForm.$form.pristine;
    let valid = newArticleForm.$form && newArticleForm.$form.valid;

    return (
      <div>
        <h2>Create new Article...(admin only)</h2>
        <ArticleForm
          onSubmit={this.handleSubmit}
          model={'newArticle'}
          pending={pending}
          pristine={pristine}
          valid={valid} />
      </div>
    );
  }
}
