export const WRITE_ID_ARTICLE = 'WRITE_ID_ARTICLE'
export const VALIDATE_ID_ARTICLE = 'VALIDATE_ID_ARTICLE'

export function writeIdArticle(idArticle) {
  return (dispatch) => {
    dispatch(validateIdArticle(idArticle))
    dispatch({
      type: WRITE_ID_ARTICLE,
      idArticle
    })
  }
}

export function validateIdArticle (idArticle) {
  let isValid = /^(0|[1-9]\d*)$/.test(idArticle);
  return {
    type: VALIDATE_ID_ARTICLE,
    isValid
  }
}
