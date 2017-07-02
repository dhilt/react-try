export const OPEN_CONFIRMATION_MODAL = 'OPEN_CONFIRMATION_MODAL'
export const CLOSE_CONFIRMATION_MODAL = 'CLOSE_CONFIRMATION_MODAL'

export function openConfirmationModal() {
  return {
    type: OPEN_CONFIRMATION_MODAL
  }
}

export function closeConfirmationModal() {
  return {
    type: CLOSE_CONFIRMATION_MODAL
  }
}
