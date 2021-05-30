import React, {Component} from "react";
import axios from "axios";


export class ProfilePost extends Component{

    constructor(props) {
        super(props);
        this.state = {
            id_post: this.props.id_post,
            countLike: this.props.countLike,
            countComments:  this.props.countComments,
            image:  this.props.image,
            checkLike: this.props.checkLike
        }
    }

    sendLike = (id_post) =>{
        axios.post("/api/add_like/" + id_post,{}, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }
        )
        let count = this.state.countLike;
        if(this.state.likeCheck){
            count -= 1;
        }else{
            count += 1;
        }

        this.setState({
            countLike : count,
            checkLike: !this.state.checkLike
        })

    }

    render(){
        return (
            <div className="gallery-item" tabIndex="0">
            <img src={this.state.image} onDoubleClick={() => this.sendLike(this.state.id_post)}
                 className="gallery-image" alt=""/>
            <div className="gallery-item-type">
                <span className="visually-hidden">Gallery</span><i className="fa fa-clone" aria-hidden="true"/>
            </div>
            <div className="gallery-item-info">
                <ul>
                    <li className="gallery-item-likes"><span
                        className="visually-hidden">Likes:</span><i className="fa  fa-heart"
                                                                    aria-hidden="true"/> {this.state.countLike}
                    </li>
                    <li className="gallery-item-comments"><span
                        className="visually-hidden">Comments:</span><i className="fa fa-comment"
                                                                       aria-hidden="true"/> {this.state.countComments}
                    </li>
                </ul>
            </div>
        </div>
        );
    }
}