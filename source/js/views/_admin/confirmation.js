import React, { Component } from 'react'
import ReactModal from 'react-modal'

export const ConfirmationModal = props => {

  return (
    <ReactModal
      isOpen={props.isOpenModal}
      contentLabel={props.dialogTitle}>

      <h1>{props.dialogTitle || 'Confirm Modal'}</h1>
      <button type='button' onClick={props.confirm}>{props.textButtonOk || 'Ok!'}</button>
      <button type='button' onClick={props.cancel}>{props.textButtonCancel || 'Cancel'}</button>
    </ReactModal>
  )
}
