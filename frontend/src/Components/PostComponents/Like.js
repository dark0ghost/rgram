import React, {Component} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import axios from "axios";


class Like extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('username'),
            id_post: this.props.match.params.id_post,
            id_user: this.props.match.params.id_user,
            renderName: this.props.match.params.renderName,
            renderUserName: this.props.match.params.renderUserName,
            content : this.props.match.params.content,
            title: this.props.match.params.title,
            key: this.props.match.params.key,
            tags: this.props.match.params.tags,
            image: this.props.match.params.image
        }
    }

    sendLike = (id_post) =>{
        axios.post("/api/add_like/" + id_post,{}, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }
        )
    }

    check = () =>{

    }

    getLike = () =>{

    }

    getRenderLike = (likecount, likeCheck, id_post) =>{
        if (!likeCheck) {
            return (
                <div><Checkbox icon={<FavoriteBorder/>}
                               checkedIcon={<Favorite/>}
                               name="checkedH"
                               onChange={(event) => this.sendLike(id_post)}/>{likecount}<a href={"/comments/" + id_post} ><Checkbox icon={<CommentIcon/>}  checkedIcon={<CommentIcon/>} onChange={() =>{ return window.location = "/comments/" + id_post}}/></a></div>
            );
        }
        return (
            <div><Checkbox icon={<Favorite/>}
                           checkedIcon={<FavoriteBorder/>}
                           name="checkedH"
                           onChange={(event) => this.sendLike(id_post)}/> {likecount}<a href={"/comments/" + id_post} ><Checkbox icon={<CommentIcon/>}  checkedIcon={<CommentIcon/>} onChange={() =>{ return window.location = "/comments/" + id_post}}/></a></div>
        );
    }

    render() {
    }

}