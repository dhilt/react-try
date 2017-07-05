import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Paging from './Paging'
import { ArticlesControlPanel } from './articlesControlPanel'

import { setPage } from 'actions/articles'
import { writeIdArticle } from 'actions/_admin/articlesControlPanel'
import { getExistArticleAsync } from 'actions/_admin/editArticle'
import { removeArticleAsync, openConfirmationModal, closeConfirmationModal } from 'actions/_admin/removeArticle'
import { getLocationPage, persistPage } from 'helpers/page'

@connect(state => ({
  listArticles: state.articles.get('listArticles'),
  pending: state.articles.get('pending'),
  error: state.articles.get('error'),
  total: state.articles.get('total'),
  page: state.articles.get('page'),
  count: state.articles.get('count'),
  role: state.auth.get('userInfo').get('role'),
  idArticle: state._adminArticlesControlPanel && state._adminArticlesControlPanel.get('idArticle') || '',
  isValid: state._adminArticlesControlPanel && state._adminArticlesControlPanel.get('isValid') || false,
  removeArticleIsOpenModal: state._adminRemoveArticle && state._adminRemoveArticle.get('isOpenModal') || false,
  removeArticlePending: state._adminRemoveArticle && state._adminRemoveArticle.get('pending') || false,
  removeArticleServerResult: state._adminRemoveArticle && state._adminRemoveArticle.get('serverResult') || false
}))
export default class Articles extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    listArticles: PropTypes.array,
    pending: PropTypes.bool,
    error: PropTypes.string,
    total: PropTypes.number,
    page: PropTypes.number,
    count: PropTypes.number
  }

  constructor() {
    super()
    this.adminPanelWriteId = this.adminPanelWriteId.bind(this)
    this.adminPanelNewArticle = this.adminPanelNewArticle.bind(this)
    this.adminPanelEditArticle = this.adminPanelEditArticle.bind(this)
    this.adminPanelRemoveArticle = this.adminPanelRemoveArticle.bind(this)
    this.adminPanelOpenConfirmationModal = this.adminPanelOpenConfirmationModal.bind(this)
    this.adminPanelCloseConfirmationModal = this.adminPanelCloseConfirmationModal.bind(this)
  }

  componentWillMount() {
    const { dispatch, history, page, listArticles } = this.props
    let urlPage = getLocationPage(history.location), currentPage
    if(urlPage) {
      currentPage = urlPage - 1
    }
    else {
      currentPage = Number(localStorage.getItem('pageArticles')) || 0
      persistPage(currentPage, history)
    }
    if(currentPage !== page || !listArticles.size) {
      dispatch(setPage(currentPage, history))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, history, page } = this.props
    if(nextProps.pending) {
      return
    }
    let urlPage = getLocationPage(history.location)
    let currentPage = urlPage ? urlPage - 1 : 0
    if(currentPage !== page) {
      dispatch(setPage(currentPage, history))
    }
  }

  adminPanelWriteId(event) {
    this.props.dispatch(writeIdArticle(event.target.value))
  }

  adminPanelNewArticle() {
    this.props.history.push('/admin/articles/new');
  }

  adminPanelEditArticle() {
    this.props.dispatch(getExistArticleAsync(this.props.idArticle));
    this.props.history.push('/admin/articles/' + this.props.idArticle);
  }

  adminPanelRemoveArticle() {
    this.props.dispatch(removeArticleAsync(this.props.idArticle, this.props.history))
  }

  adminPanelOpenConfirmationModal() {
    this.props.dispatch(openConfirmationModal())
  }

  adminPanelCloseConfirmationModal() {
    this.props.dispatch(closeConfirmationModal())
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let Articles = this.props.listArticles.map((article, index) => {
      const time = new Date(article.get('createdAt'));
      let articleYear = time.getFullYear();
      let articleMonth = time.getMonth();
      let articleDay = time.getDate();
      return <div key={index} className='Article'>
                <img src={article.get('image')} />
                <div> {months[articleMonth]}, {articleDay} {articleYear} <Link to={'/articles/' + article.get('id')}> {article.get('title')}</Link> {article.get('userName')}</div>
                <span>{article.get('description')}&nbsp;</span>
             </div>
    })

    return (
      <div className='Articles'>
        <Paging history={this.props.history} />
        {this.props.role === 1 && !this.props.pending &&
          <ArticlesControlPanel
            isValid={this.props.isValid}
            idArticle={this.props.idArticle}
            changeId={this.adminPanelWriteId}
            makeNewArticle={this.adminPanelNewArticle}
            editArticle={this.adminPanelEditArticle}

            openConfirmationModal={this.adminPanelOpenConfirmationModal}
            cancelRemoveArticle={this.adminPanelCloseConfirmationModal}
            confirmRemoveArticle={this.adminPanelRemoveArticle}
            isOpenConfirmationModal={this.props.removeArticleIsOpenModal}
            pending={this.props.removeArticlePending}
            serverResult={this.props.removeArticleServerResult} />}
        <ul className={this.props.pending ? 'ArticlesPreloader' : ''}>{Articles}</ul>
      </div>
    )
  }
}
