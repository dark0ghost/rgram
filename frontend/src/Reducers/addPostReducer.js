export const addPostReducer = (state={loading: false, msg: ""},action) => {
    switch(action.type){
        case "ADD_STARTED":
        return Object.assign({}, state, { loading: true });
        case "ADD_SUCCESS":
        return Object.assign({}, state, { loading: false, msg: "Post added Successfully" });
        case "ADD_ERROR":
        return Object.assign({}, state, { loading: false, msg: "Unknown Error. Try after sometime" });
        default: return state;
    }

}