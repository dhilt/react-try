import React from 'react'

export default props =>
  <ul className="list-dashboard-articles">
  {
    props.list.map((article, index) => {
      const time = new Date(article.get('createdAt'))
      const articleDay = time.getUTCDate()
      const articleMonthName = time.getMonthName()
      return (
        <div key={index} className="article">
          <div className="user-info-article">
            <div className="article-created-at">
              <p>{articleDay}</p>
              <p>{articleMonthName}</p>
            </div>
            <img src={article.get('image')} />
            <div>{article.get('userName')}</div>
          </div>
          <div className="text-article">
            <p>{article.get('title')}</p>
            <p>{article.get('description')}</p>
            <p>{article.get('text')}</p>
          </div>
        </div>
      )
    })
  }
  </ul>
