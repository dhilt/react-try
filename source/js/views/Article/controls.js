import React, { Component } from 'react'
import { ConfirmationModal } from 'views/_admin/confirmation'

export const ArticleControls = props => {

  let { id, role, isOpenModal, isRemovedArticle, pending, serverResult } = props
  if(role !== 1) {
    return null;
  }
  return (
    <div className='adminPanelCreateAndRemoveArticles'>
        <a onClick={props.goToArticlePage} href={'/admin/articles/' + id}>{'Править статью +'}</a>
        <a onClick={props.openModal}>{'Удалить статью -'}</a>
        <ConfirmationModal
          isOpenModal={isOpenModal}
          cancel={props.cancel}
          confirm={props.confirm}
          dialogTitle={'Confirm removing article'}
          message={serverResult}
          pending={pending}
          textButtonOk={'Yes, remove article!'}
          textButtonCancel={'No, hide this modal!'} />
    </div>
  )
}
