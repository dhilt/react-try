import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'

import {
  setFilterAuthor,
  setFilterTitle,
  setFilterBeginDate,
  setFilterEndDate,
  cleanUpFilter
} from 'actions/articles'

@connect(state => ({
  filter: state.articles.get('filter')
}))
export default class ArticlesControlPanel extends Component {

  constructor() {
    super()
    this.makeNewArticle = this.makeNewArticle.bind(this)
    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeBeginDate = this.onChangeBeginDate.bind(this)
    this.onChangeEndDate = this.onChangeEndDate.bind(this)
    this.cleanFilter = this.cleanFilter.bind(this)
  }

  makeNewArticle() {
    this.props.history.push('/admin/articles/new')
  }

  onChangeUserName(event) {
    this.props.dispatch(setFilterAuthor(event.target.value, this.props.history))
  }

  onChangeTitle(event) {
    this.props.dispatch(setFilterTitle(event.target.value, this.props.history))
  }

  onChangeBeginDate(date) {
    this.props.dispatch(setFilterBeginDate(date, this.props.history))
  }

  onChangeEndDate(date) {
    this.props.dispatch(setFilterEndDate(date, this.props.history))
  }

  cleanFilter() {
    this.props.dispatch(cleanUpFilter(this.props.history))
  }

  render() {
    let { author, title, dateFrom, dateTo } = this.props.filter.toJS()
    return (
      <div className='articles-control-panel'>
        <div className='filter'>
          <label>{'Сортировать по: '}</label>
          <input placeholder='UserName' onChange={this.onChangeUserName} value={author} />
          <input placeholder='Title' onChange={this.onChangeTitle} value={title} />
          <label>{'От: '}</label>
          <DatePicker
            dateFormat='YYYY/MM/DD'
            placeholderText='Date from'
            selected={dateFrom}
            onChange={this.onChangeBeginDate}
          />
          <label>{'До: '}</label>
          <DatePicker
            dateFormat='YYYY/MM/DD'
            placeholderText='Date to'
            selected={dateTo}
            onChange={this.onChangeEndDate}
          />
          <button onClick={this.cleanFilter}>{'Сбросить фильтрацию'}</button>
          <button type='button' onClick={this.makeNewArticle}>{'Создать статью'}</button>
        </div>
      </div>
    )
  }
}
