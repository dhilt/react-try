import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createArticleAsync } from 'actions/_admin/newArticle';
import { ArticleForm } from '../ArticleForm';

@connect(state => ({
  newArticle: state._adminNewArticle,
  newArticleForm: state._adminForms.forms.newArticleModel,
  newArticleModel: state._adminForms.newArticleModel
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
    let { newArticle, newArticleModel, newArticleForm } = this.props;
    let pending = newArticle.get('pending');
    let pristine = newArticleForm.$form && newArticleForm.$form.pristine;
    let valid = newArticleForm.$form && newArticleForm.$form.valid;

    return (
      <div>
        <h2>Create new Article...(admin only)</h2>
        <ArticleForm
          data={''}
          onSubmit={this.handleSubmit}
          model={'newArticleModel'}
          pending={pending}
          pristine={pristine}
          valid={valid} />
      </div>
    );
  }
}
