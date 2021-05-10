import axios from "axios";

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
        let teg_id = []
        input.tags.split(" ").forEach(element =>{
            console.log(element)
           fetch("/api/create_tag/" + element, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`}
                }
            ).then(response => teg_id.push(response.json().id))

        })

        let form = new FormData()
        form.append("title", input.title)
        form.append("image", input.image)
        form.append( "owner", input.user)
        form.append("content", input.content)
        form.append("tags" ,1)

       axios.post("/api/create_post/",form, {
           headers: {
               Authorization: `JWT ${localStorage.getItem('token')}`}
                }
        ).then((response) => {
            console.log(response, " sdasf")
            dispatch(add_Post_Success());  
            history.push("/")          
        }).catch((error) => {
           //console.log(error);
            dispatch(add_Post_Error());            
        })
    }
}