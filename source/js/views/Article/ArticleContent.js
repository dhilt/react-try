import React from 'react'

export default props => {

  const article = props.article
  const time = new Date(article.get('createdAt'))
  const timeTitle = `Date: ${time.getDate()} ${time.getMonthName()}, ${time.getFullYear()}`

  return (
    <div>
      <p className="article-title">{article.get('title')}</p>
      <p className="article-date">{timeTitle}</p>
      <p className="article-author">{`Author: ${article.get('userName')}`}</p>
      <p className="article-description">{article.get('description')}</p>
      <img className="article-image" src={article.get('image')} />
      <pre className="article-text">{article.get('text')}</pre>
    </div>
  )
}
