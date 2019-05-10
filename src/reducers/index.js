export const SET_FONTSIZE = 'SET_FONTSIZE';

const detailReducer = (state = {
  fontSize: 16,
}, action) => {
  switch (action.type) {
    case SET_FONTSIZE:
      return {
        ...state,
        fontSize: action.fontSize
      }
    default:
      return state
  }
}

export default detailReducer;