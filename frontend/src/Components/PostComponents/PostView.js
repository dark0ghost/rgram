import React, {Component} from "react";
import {Like} from "./Like";
import axios from "axios";


export class Moment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('username'),
            id_post: this.props.id_post,
            renderName: this.props.renderName,
            renderUserName: this.props.renderUserName,
            content : this.props.content,
            title: this.props.title,
            keyPost: this.props.keyPost,
            tags: this.props.tags,
            image: this.props.image,
            avatar: this.props.avatar,
            like: (<Like id_post={this.props.id_post} />)
        }
    }
    sendLike = (id_post) =>{
        axios.post("/api/add_like/" + id_post,{}, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }
        )
        this.setState({like :<Like id_post={this.state.id_post}/>})

    }

    render() {
        return (
            <div key={this.state.key} className="post">
                <div className="caption">
                    <a href={"/user/" + this.state.renderUserName}><img  src={this.state.avatar} alt="dp" className="user" /></a>
                    <h4 className="caption-text">{this.state.title}</h4>
                </div>
                <img onDoubleClick={() => this.sendLike(this.state.id_post)} src={this.state.image} alt="Post" className="post-image" />
                {this.state.like}
                <div className="caption">
                    <a href={"/user/" + this.state.renderUserName}> <img  src={this.state.avatar} alt="dp" className="user"   /></a>
                    <h4 className="caption-text fix-image"><a href={"/user/" + this.state.renderUserName}>{this.state.renderName}</a>: {this.state.content}  </h4>
                </div>
                <div className="tag">{this.state.tags}</div>
            </div>
        );
    }


}