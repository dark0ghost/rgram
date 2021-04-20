export const getPostReducer = (state = { loading: false }, action) => {
    switch (action.type) {
      case "FETCH_STARTED":
        return Object.assign({}, state, { loading: true });
      case "FETCH_SUCCESS":
        return Object.assign({}, state, {data: action.data}, { loading: false });
      case "FETCH_ERROR":
        return Object.assign({}, state, { loading: false });
      default:
        return state;
    }
  };