import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPage } from 'actions/articles'

@connect(state => ({
  page: state.articles.get('page'),
  count: state.articles.get('count'),
  total: state.articles.get('total'),
  pending: state.articles.get('pending')
}))
export default class Paging extends Component {
  constructor() {
    super()
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  getPages(props) {
    const { page, count, total } = props
    const pagesCount = Math.ceil(total / count)
    const space = 2

    let pages = [ { index: 0, type: 'button' } ]
    if(page > 0 + space) {
      pages.push({ type: 'delimiter' })
    }
    for(let j = Math.max(1, page - space); j < Math.min(pagesCount - 1, page + space + 1); j++) {
      pages.push({ index: j, type: 'button' })
    }
    if(page < pagesCount - space - 1) {
      pages.push({ type: 'delimiter' })
    }
    if(pagesCount > 1) {
      pages.push({ index: pagesCount - 1, type: 'button' })
    }

    let activePage = pages.find(p => p.index === page)
    if(activePage) {
      activePage.active = true
    }

    return pages
  }

  handleChangePage(page) {
    const { dispatch, pending, history } = this.props
    if(!pending) {
      dispatch(setPage(page, history))
    }
  }

  render() {
    let pages = this.getPages(this.props)
    return !this.props.total ? null : (
      <div className='articles-paging'>
        {
          pages.map((item, index) =>
            item.type === 'button' ? (
              <button
                key={index}
                className={item.active ? 'active' : ''}
                disabled={item.active}
                onClick={() => this.handleChangePage(item.index)}
              >{item.index + 1}
              </button>
            ) : (
              <span key={index}>{'...'}</span>
            )
          )
        }
      </div>
    )
  }
}
