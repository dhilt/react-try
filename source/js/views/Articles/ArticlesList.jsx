import React from 'react'
import { Link } from 'react-router-dom'

import ArticleControlPanel from 'views/_admin/Articles/ArticleControlPanel'

export default props =>
  <ul className={props.pending ? 'articles-preloader' : ''}>
    {
      props.listArticles.map((article, index) => {
        const time = new Date(article.get('createdAt'))
        const dataTitle = time.getUTCDate() + ' ' + time.getMonthName() + ', ' + time.getFullYear()
        const userTitle = ' ' + article.get('userName') + ' '
        return (
          <div key={index} className="article-one-of">
            <img src={article.get('image')} />
            <div className="head-article">
              <span>{dataTitle}</span>
              <span>{userTitle}</span>
              <Link to={'/articles/' + article.get('id')}>{' ' + article.get('title')}</Link>
              {props.role === 1 &&
                <ArticleControlPanel
                  history={props.history}
                  idArticle={article.get('id')}/>}
            </div>
            <span>{article.get('description')}&nbsp;</span>
          </div>
        )
      })
    }
  </ul>
