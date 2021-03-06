import axios from 'axios';

const get_Post_Started = () => {
    return ({
        type: "FETCH_STARTED"
    });
}

const get_Post_Success = (data) => {
    return ({
        type: "FETCH_SUCCESS",
        data: data
    });
}

const get_Post_Error = () => {
    return ({
        type: "FETCH_ERROR"
    });
}

export const getPostThunk = () => {
    return (dispatch) => {
        dispatch(get_Post_Started());
        axios.get("api/posts", {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }}).then((response) => {
            dispatch(get_Post_Success(response.data));            
        }).catch((error) => {
            dispatch(get_Post_Error());            
        })
    }
}