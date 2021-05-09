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
        let tag = [];
        input.tags.split(" ").forEach(element => tag.push({'name': element}))

        let form = new FormData()
        form.append("title", input.title)
        form.append("image", input.image)
        form.append( "user", input.user)
        form.append("content", input.content)
        form.append("tags" , tag)

        const obj = {
            "title" : input.title,
            "image" : input.image,
            "user" : input.user,
            "content" : input.content,
            "tags" : tag
        };
        console.log(obj)
        fetch("/api/create_post/",{
                method: 'POST',
                body: form,  headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                   // 'Content-Type': 'multipart/form-data'
                    'Content-Type': 'multipart/form-data'
                }
        }
        ).then((response) => {
            console.log(response.json());
            dispatch(add_Post_Success());  
            history.push("/")          
        }).catch((error) => {
            dispatch(add_Post_Error());            
        })
    }
}