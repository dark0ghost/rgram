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

const get_tag_id = (tags) =>{
    let tag_id = []
    tags.split(" ").forEach(element =>{
        fetch("/api/create_tag/" + element, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`}
            }
        )
            .then(response => response.json())
            .then(json =>{
                console.log(json.id)
                tag_id.push(toString(json.id))
            })

    })
    return tag_id
}

export const addPostThunk = (input, history) => {
    return (dispatch) => {
        dispatch(add_Post_Started());

        const obj = {
            "owner": input.user,
            "title": input.title,
            "content":  input.content,
            "image":  input.image,
            "tags":  get_tag_id(input.tags),
        }
        console.log(obj)

        let form = new FormData()
        form.append("title", input.title)
        form.append("image", input.image)
        form.append( "owner",  input.user)
        form.append("content", input.content)
        form.append("tags" , get_tag_id(input.tags))

       axios.post("/api/create_post/",form, {
           headers: {
               Authorization: `JWT ${localStorage.getItem('token')}`}
                }
        ).then((response) => {
            console.log(response.data, " response")
            dispatch(add_Post_Success());  
            history.push("/")          
        }).catch((error) => {
            dispatch(add_Post_Error());            
        })
    }
}