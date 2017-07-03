import React, { Component } from 'react'
import { ConfirmationModal } from 'views/_admin/confirmation'
import { Redirect } from 'react-router-dom'

export const ArticleControls = props => {

  let { id, role, isOpenModal, isRemovedArticle } = props
  if(role !== 1) {
    return null;
  }
  return (
    <div className='adminPanelCreateAndRemoveArticles'>
        <a onClick={props.goToArticlePage} href={'/admin/articles/' + id}>{'Править статью +'}</a>
        <a onClick={props.openModal}>{'Удалить статью -'}</a>
        <ConfirmationModal
          isOpenModal={isOpenModal}
          closeModal={props.closeModal}
          confirmEvent={props.removeArticle}
          dialogTitle={'Confirm removing article'}
          textButtonOk={'Yes, remove article!'}
          textButtonCancel={'No, hide this modal!'} />
        { isRemovedArticle && <Redirect to={'/articles'}/> }
    </div>
  )
}
