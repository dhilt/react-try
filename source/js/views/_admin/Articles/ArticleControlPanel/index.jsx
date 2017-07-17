import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ConfirmationModal } from 'views/_admin/confirmation'

import { getExistArticleAsync } from 'actions/_admin/editArticle'
import { removeArticleAsync, openConfirmationModal, closeConfirmationModal } from 'actions/_admin/removeArticle'

@connect(state => ({
  removeArticleIsOpenModal: state._adminRemoveArticle.get('isOpenModal'),
  removeArticlePending: state._adminRemoveArticle.get('pending'),
  removeArticleServerResult: state._adminRemoveArticle.get('serverResult')
}))
export default class ArticleControlPanel extends Component {

  constructor() {
    super()

    this.editArticle = this.editArticle.bind(this)
    this.removeArticle = this.removeArticle.bind(this)
    this.removeArtcielOpenConfirmationModal = this.removeArtcielOpenConfirmationModal.bind(this)
    this.removeArticleCloseConfirmationModal = this.removeArticleCloseConfirmationModal.bind(this)
  }

  editArticle() {
    this.props.dispatch(getExistArticleAsync(this.props.idArticle))
    this.props.history.push('/admin/articles/' + this.props.idArticle)
  }

  removeArticle() {
    this.props.dispatch(removeArticleAsync(this.props.idArticle, this.props.history))
  }

  removeArtcielOpenConfirmationModal() {
    this.props.dispatch(openConfirmationModal())
  }

  removeArticleCloseConfirmationModal() {
    this.props.dispatch(closeConfirmationModal())
  }

  render() {
    let { removeArticleIsOpenModal, removeArticlePending, removeArticleServerResult } = this.props
    return (
      <div className='ArticleControlPanel'>
        <a onClick={this.editArticle}>{'Редактировать статью '}</a>
        <a onClick={this.removeArtcielOpenConfirmationModal}>{'Удалить статью'}</a>

        <ConfirmationModal
          isOpenModal={removeArticleIsOpenModal}
          cancel={this.removeArticleCloseConfirmationModal}
          confirm={this.removeArticle}
          dialogTitle={'Confirm removing article'}
          message={removeArticleServerResult}
          pending={removeArticlePending}
          textButtonOk={'Yes, remove article!'}
          textButtonCancel={'No, hide this modal!'} />
      </div>
    )
  }
}
