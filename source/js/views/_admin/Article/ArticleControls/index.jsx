import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ConfirmationModal } from 'views/_admin/confirmation'

import { setEditPageSource } from 'actions/_admin/editArticle'
import { openConfirmationModal, closeConfirmationModal, removeArticleAsync } from 'actions/_admin/removeArticle'

@connect(state => ({
  article: state.article.get('data'),
  removeArticle: state._adminRemoveArticle
}))
export default class ArticleControls extends React.Component {

  constructor() {
    super()
    this.goToEditArticlePage = this.goToEditArticlePage.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.removeArticle = this.removeArticle.bind(this)
  }

  goToEditArticlePage(e) {
    const { dispatch, history } = this.props
    e.preventDefault()
    dispatch(setEditPageSource())
    let location = history.location
    location.pathname = e.target.pathname
    history.push(location)
  }  

  openModal() {
    this.props.dispatch(openConfirmationModal())
  }

  closeModal() {
    this.props.dispatch(closeConfirmationModal())
  }

  removeArticle() {
    this.props.dispatch(removeArticleAsync(this.props.article.get('id'), this.props.history))
  }

  render() {
    const { article, openModal, removeArticle } = this.props

    let getRemoveArticleAttr = (token) =>
      removeArticle && removeArticle.get(token)

    return (
      <div className='adminPanelCreateAndRemoveArticles'>
          <a onClick={this.goToEditArticlePage} href={'/admin/articles/' + article.get('id')}>
            {'Править статью +'}
          </a>
          <a onClick={this.openModal}>
            {'Удалить статью -'}
          </a>
          <ConfirmationModal
            dialogTitle={'Confirm removing article'}
            textButtonOk={'Yes, remove article!'}
            textButtonCancel={'No, hide this modal!'}
            isOpenModal={getRemoveArticleAttr('isOpenModal')}
            cancel={this.closeModal}
            confirm={this.removeArticle}
            message={getRemoveArticleAttr('serverResult')}
            pending={getRemoveArticleAttr('modalPending')} />
      </div>
    )
  }
}
