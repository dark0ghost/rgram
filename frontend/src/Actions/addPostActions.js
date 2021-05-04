import axios from 'axios';

const add_Post_Started = () => {
    return ({
        type: "ADD_STARTED"
    });
}

const add_Post_Success = () => {
    return ({
        type: "ADD_SUCCESS"
    });
}

const add_Post_Error = () => {
    return ({
        type: "ADD_ERROR"
    });
}

export const addPostThunk = (input, history) => {
    return (dispatch) => {
        dispatch(add_Post_Started());
        const obj = {
            title: input.caption,
            image_url: input.url,
            comments: [],
            likes: 0,
            time: Date.now()
        };
        axios.post("http://127.0.0.1:8000/api/create_post/",obj).then((response) => {
            console.log(response.data);
            dispatch(add_Post_Success());  
            history.push("/")          
        }).catch((error) => {
            console.log('error: ', error);
            dispatch(add_Post_Error());            
        })
    }
}