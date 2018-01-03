import React from 'react'

export default props => {

  const getPages = () => {
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

  const pages = getPages()
  return props.total && (
    <div className="articles-paging">
      {
        pages.map((item, index) =>
          item.type === 'button' ? (
            <button
              key={index}
              disabled={item.active}
              className={item.active ? 'active' : ''}
              onClick={() => props.handleChangePage(item.index)}>
              {item.index + 1}
            </button>
          ) : (
            <span key={index}>{'...'}</span>
          )
        )
      }
    </div>
  )
}
