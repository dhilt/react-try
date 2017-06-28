import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form/immutable';

import { editArticleAsync, getExistArticleAsync } from 'actions/_admin/editArticle';
import { ArticleForm } from '../ArticleForm';

@connect(state => ({
  editArticle: state.admin.editArticle,
  editArticleForm: state.admin.forms.editArticle,
  pending: state.admin.editArticle.get('pending'),
  source: state.admin.editArticle.get('source')
}))
export default class EditArticle extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetButton = this.resetButton.bind(this);
  }

  handleSubmit() {
    const { dispatch } = this.props;
    dispatch(editArticleAsync());
  }

  resetButton() {
    this.props.dispatch(actions.change('editArticle.text', 'Some text!'));
  }

  componentDidMount() {
    console.log('componentDidMount!');
    if (!this.props.source) {
      this.props.dispatch(getExistArticleAsync(this.props.match.params.id));
    }
    // Заполнение исходными данными из admin.editArticle.source
  }

  render() {
    let { editArticleForm, pending } = this.props;
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
        <button className='ArticleFormResetButton' onClick={this.resetButton}>{'Сбросить'}</button>
      </div>
    );
  }
}
