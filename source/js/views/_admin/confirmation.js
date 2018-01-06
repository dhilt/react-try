import React from 'react'
import ReactModal from 'react-modal'

export default (props) =>
  <ReactModal
    isOpen={props.isOpenModal}
    contentLabel={props.dialogTitle}>
    <h1>{props.dialogTitle || 'Confirm Modal'}</h1>
    <button type="button"
      disabled={props.pending}
      onClick={props.confirm}>{props.textButtonOk || 'Ok!'}
    </button>
    <button type="button"
      onClick={props.cancel}>{props.textButtonCancel || 'Cancel'}
    </button>
    {props.pending && <div className="preloader" />}
    {props.message &&
      <div>
        <p>{'Message time: ' + String(new Date())}</p>
        <p>{props.message}</p>
      </div>
    }
  </ReactModal>
