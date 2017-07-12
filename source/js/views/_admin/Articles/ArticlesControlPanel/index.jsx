import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'

import { ConfirmationModal } from 'views/_admin/confirmation'

import { writeIdArticle } from 'actions/_admin/articlesControlPanel'
import { getExistArticleAsync } from 'actions/_admin/editArticle'
import { removeArticleAsync, openConfirmationModal, closeConfirmationModal } from 'actions/_admin/removeArticle'
import { setFilterAuthor, setFilterTitle, setFilterBeginDate, setFilterEndDate, cleanUpFilter } from 'actions/articles'

@connect(state => ({
  idArticle: state._adminArticlesControlPanel.get('idArticle'),
  isValid: state._adminArticlesControlPanel.get('isValid'),
  removeArticleIsOpenModal: state._adminRemoveArticle.get('isOpenModal'),
  removeArticlePending: state._adminRemoveArticle.get('pending'),
  removeArticleServerResult: state._adminRemoveArticle.get('serverResult')
}))
export default class ArticlesControlPanel extends Component {

  constructor() {
    super()
    this.state = {
      beginDate: '',
      endDate: '',
      author: '',
      title: ''
    }

    this.onChangeId = this.onChangeId.bind(this)
    this.makeNewArticle = this.makeNewArticle.bind(this)
    this.editArticle = this.editArticle.bind(this)
    this.removeArticle = this.removeArticle.bind(this)
    this.removeArtcielOpenConfirmationModal = this.removeArtcielOpenConfirmationModal.bind(this)
    this.removeArticleCloseConfirmationModal = this.removeArticleCloseConfirmationModal.bind(this)
    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeBeginDate = this.onChangeBeginDate.bind(this)
    this.onChangeEndDate = this.onChangeEndDate.bind(this)
    this.cleanFilter = this.cleanFilter.bind(this)
  }

  onChangeId(event) {
    this.props.dispatch(writeIdArticle(event.target.value))
  }

  makeNewArticle() {
    this.props.history.push('/admin/articles/new')
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

  onChangeUserName(event) {
    this.props.dispatch(setFilterAuthor(event.target.value, this.props.history))
    this.setState({
      author: event.target.value
    })
  }

  onChangeTitle(event) {
    this.props.dispatch(setFilterTitle(event.target.value, this.props.history))
    this.setState({
      title: event.target.value
    })
  }

  onChangeBeginDate(date) {
    const beginDate = date._d.toISOString().slice(0,10)
    this.props.dispatch(setFilterBeginDate(beginDate, this.props.history))
    this.setState({
      beginDate: date
    })
  }

  onChangeEndDate(date) {
    const endDate = date._d.toISOString().slice(0,10)
    this.props.dispatch(setFilterEndDate(endDate, this.props.history))
    this.setState({
      endDate: date
    })
  }

  cleanFilter() {
    this.props.dispatch(cleanUpFilter(this.props.history))
    this.setState({
      beginDate: '',
      endDate: '',
      author: '',
      title: ''
    })
  }

  render() {
    let { role, idArticle, isValid, removeArticleIsOpenModal, removeArticlePending, removeArticleServerResult } = this.props
    return (
      <div className='ArticlesControlPanel'>
      <button type='button' onClick={this.makeNewArticle}>{'Создать статью'}</button>
      <button type='button' className={!isValid && 'disabledButton'} disabled={!isValid} onClick={this.editArticle}>{'Редактировать статью'}</button>
      <button type='button' className={!isValid && 'disabledButton'} disabled={!isValid} onClick={this.removeArtcielOpenConfirmationModal}>{'Удалить статью'}</button>
      <input type='text' value={idArticle} onChange={this.onChangeId} placeholder='id of article...' className={!isValid ? 'invalidInput' : ''}></input>
      <div className='filter'>
        <label>{'Сортировать по: '}</label>
        <input placeholder='UserName' onChange={this.onChangeUserName} value={this.state.author} />
        <input placeholder='Title' onChange={this.onChangeTitle} value={this.state.title} />
        <label>{'От: '}</label>
        <DatePicker
          dateFormat='YYYY/MM/DD'
          placeholderText='Date from'
          selected={this.state.beginDate}
          onChange={this.onChangeBeginDate}
        />
        <label>{'До: '}</label>
        <DatePicker
          dateFormat='YYYY/MM/DD'
          placeholderText='Date to'
          selected={this.state.endDate}
          onChange={this.onChangeEndDate}
        />
        <button onClick={this.cleanFilter}>{'Сбросить фильтрацию'}</button>
      </div>

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