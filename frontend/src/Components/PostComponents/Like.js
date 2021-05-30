import React, {Component} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import axios from "axios";


export class Like extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('username'),
            id_post: this.props.id_post,
        }
    }

    sendLike = (id_post) =>{
        axios.post("/api/add_like/" + id_post,{}, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }
        )
        this.getLike()
    }

    getLike = () =>{
        axios.get("/api/posts", {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }}).then((response) => {
            let like = response.data[this.state.id_post - 1].likes;
            let likeCheck
            like.forEach(element => likeCheck |=  element.username === this.state.username);
            this.setState({
                likecount : like.length,
                likeCheck: likeCheck
            })
        })
    }

    componentDidMount() {
        this.getLike()
    }


    render() {
        if (!this.state.likeCheck) {
            return (
                <div><Checkbox icon={<FavoriteBorder/>}
                               checkedIcon={<Favorite/>}
                               name="checkedH"
                               onChange={(event) => this.sendLike(this.state.id_post)}/>{this.state.likecount}<a
                    href={"/comments/" + this.state.id_post}><Checkbox icon={<CommentIcon/>}
                                                                       checkedIcon={<CommentIcon/>} onChange={() => {
                    return window.location = "/comments/" + this.state.id_post
                }}/></a></div>
            );
        }
        return (
            <div><Checkbox icon={<Favorite/>}
                           checkedIcon={<FavoriteBorder/>}
                           name="checkedH"
                           onChange={(event) => this.sendLike(this.state.id_post)}/> {this.state.likecount}<a
                href={"/comments/" + this.state.id_post}><Checkbox icon={<CommentIcon/>} checkedIcon={<CommentIcon/>}
                                                                   onChange={() => {
                                                                       return window.location = "/comments/" + this.state.id_post
                                                                   }}/></a></div>
        );
    }

}
