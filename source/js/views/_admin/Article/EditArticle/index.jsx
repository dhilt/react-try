import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form/immutable'

import { editArticleAsync, getExistArticleAsync, resetForm } from 'actions/_admin/editArticle'
import { ArticleForm } from '../ArticleForm'

@connect(state => ({
  editArticle: state._adminEditArticle,
  editArticleForm: state._adminForms.forms.editArticleModel,
  editArticleModel: state._adminForms.editArticleModel
}))
export default class EditArticle extends Component {

  constructor() {
    super()
    this.onDateChanged = this.onDateChanged.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetButton = this.resetButton.bind(this)
  }

  componentWillMount() {
    let { dispatch, editArticle } = this.props
    if(!editArticle.get('source').get('id')) {
      dispatch(getExistArticleAsync(this.props.match.params.id))
    }
  }

  onDateChanged(value, model, validators) {
    const { dispatch } = this.props
    dispatch(actions.change(model, value))
    dispatch(actions.validate(model, validators(value)))
  }

  handleSubmit() {
    const { dispatch, editArticle } = this.props
    dispatch(editArticleAsync())
  }

  resetButton() {
    const { dispatch, editArticle } = this.props
    dispatch(resetForm(editArticle.get('source')))
  }

  render() {
    let { editArticle, editArticleModel, editArticleForm } = this.props
    let pending = editArticle.get('pending')
    let sourceAppliedCount = editArticle.get('sourceAppliedCount')
    let pristine = editArticleForm.$form && editArticleForm.$form.pristine
    let valid = editArticleForm.$form && editArticleForm.$form.valid
    return (
      <div>
        <h2>Edit Article...(admin only)</h2>
        {
          !sourceAppliedCount ? (
            <div>waiting...</div>
          ) : (
            <div>
              <ArticleForm
                data={editArticleModel.toJS()}
                onDateChanged={this.onDateChanged}
                onSubmit={this.handleSubmit}
                model={'editArticleModel'}
                pending={pending}
                pristine={pristine}
                valid={valid} />
              <button className='ArticleFormResetButton' onClick={this.resetButton}>
                {'Сбросить'}
              </button>
            </div>
          )
        }
      </div>
    );
  }
}
