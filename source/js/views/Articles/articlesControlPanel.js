import React, { Component } from 'react'
import { ConfirmationModal } from 'views/_admin/confirmation'

export const ArticlesControlPanel = props => {

  return (
    <div className='ArticlesControlPanel'>
      <button type='button' onClick={props.makeNewArticle}>{'Создать статью'}</button>
      <button type='button' className={!props.isValid && 'disabledButton'} disabled={!props.isValid} onClick={props.editArticle}>{'Редактировать статью'}</button>
      <button type='button' className={!props.isValid && 'disabledButton'} disabled={!props.isValid} onClick={props.openConfirmationModal}>{'Удалить статью'}</button>
      <input type='text' value={props.idArticle} onChange={props.changeId} placeholder='id of article...' className={!props.isValid ? 'invalidInput' : ''}></input>
      <ConfirmationModal
          isOpenModal={props.isOpenConfirmationModal}
          cancel={props.cancelRemoveArticle}
          confirm={props.confirmRemoveArticle}
          dialogTitle={'Confirm removing article'}
          message={props.serverResult}
          pending={props.pending}
          textButtonOk={'Yes, remove article!'}
          textButtonCancel={'No, hide this modal!'} />
    </div>
  )
}
