import React, {Component} from "react";


class Moment extends Component {

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
            image: this.props.match.params.image,
            avatar: this.props.match.params.avatar


        }
    }

    render() {
        return (
            <div key={this.state.key} className="post">
                <div className="caption">
                    <a href={"/user/" + this.state.renderUserName}><img  src={this.state.avatar} alt="dp" className="user" /></a>
                    <h4 className="caption-text">{this.state.title}</h4>
                </div>
                <img onDoubleClick={() => this.sendLike(this.state.id_post)} src={this.state.image} alt="Post" className="post-image" />
                {this.getRenderLike(likecount, likeCheck, this.state.id_post)}
                <div className="caption">
                    <a href={"/user/" + this.state.renderUserName}> <img  src={this.state.avatar} alt="dp" className="user"   /></a>
                    <h4 className="caption-text fix-image"><a href={"/user/" + this.state.renderUserName}>{this.state.renderName}</a>: {this.state.content}  </h4>
                </div>
                <div className="tag">{this.state.tags}</div>
            </div>
        );
    }
    }

}