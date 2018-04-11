export const ADD_PAGE_INFORMATION = 'pageInformation/ADD_PAGE_INFORMATION';

export default function pageInformation(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_PAGE_INFORMATION:
      return payload;
    default:
      return state;
  }
}

export function addPageInformation(page) {
  return {
    type: ADD_PAGE_INFORMATION,
    payload: page,
  };
}
