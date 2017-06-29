import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form/immutable';

import { editArticleAsync, getExistArticleAsync, resetForm } from 'actions/_admin/editArticle';
import { ArticleForm } from '../ArticleForm';
import { validators, validatorsVal } from 'helpers/validators'

@connect(state => ({
  editArticle: state._adminEditArticle,
  editArticleForm: state._adminForms.forms.editArticleModel,
  editArticleModel: state._adminForms.editArticleModel
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
    const { dispatch, editArticle } = this.props;
    dispatch(resetForm(editArticle.get('source')));
  }

  componentDidMount() {
    let { dispatch, editArticle } = this.props;
    if(!editArticle.get('source').get('id')) {
      dispatch(getExistArticleAsync(this.props.match.params.id)); 
    }
  }

  render() {
    let { editArticle, editArticleModel, editArticleForm } = this.props;
    let pending = editArticle.get('pending');
    let pristine = editArticleForm.$form && editArticleForm.$form.pristine;
    let valid = editArticleForm.$form && editArticleForm.$form.valid;

    return (
      <div>
        <h2>Edit Article...(admin only)</h2>
        <ArticleForm
          data={editArticleModel.toJS()}
          onSubmit={this.handleSubmit}
          model={'editArticleModel'}
          pending={pending}
          pristine={pristine}
          valid={valid} />
        <button className='ArticleFormResetButton' onClick={this.resetButton}>{'Сбросить'}</button>
      </div>
    );
  }
}
