import React, { Component } from 'react'
import ReactModal from 'react-modal'

export const ConfirmationModal = props => {

  return (
    <ReactModal
      isOpen={props.isOpenModal}
      contentLabel={props.dialogTitle}>

      <h1>{props.dialogTitle || 'Confirm Modal'}</h1>
      <button type='button' onClick={props.confirmEvent}>{props.textButtonOk || 'Ok!'}</button>
      <button type='button' onClick={props.closeModal}>{props.textButtonCancel || 'Cancel'}</button>
    </ReactModal>
  )
}
