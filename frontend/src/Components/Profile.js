import React, {Component} from "react";
import "./Profile.css"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getPostThunk} from "../Actions/getPostActions";

class Profile extends Component{
    constructor(props){
        super(props);
        this.username = localStorage.getItem('username');
        this.state = {
            array_post : []
        }
    }


    componentDidMount() {
        fetch('/api/user_post/' + this.username , {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                accept : 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                json.forEach(element =>{
                    let response = (
                        <div className="gallery-item" tabIndex="0">
                            <img src={element.image}
                                 className="gallery-image" alt=""/>
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Gallery</span><i className="fa fa-clone" aria-hidden="true"/>
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes"><span
                                        className="visually-hidden">Likes:</span><i className="fa  fa-heart"
                                                                                    aria-hidden="true"/> {element.likes.length}
                                    </li>
                                    <li className="gallery-item-comments"><span
                                        className="visually-hidden">Comments:</span><i className="fa fa-comment"
                                                                                       aria-hidden="true"/> {element.comments.length}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    );
                    this.setState({array_post: this.state.array_post.concat([response])})
                })
            });
    }




    render() {
        let image = localStorage.getItem('avatar').replace("8000","4433").replace("/nginx","");
        let countPost = this.state.array_post.length;
        return (
        <div className="set" >
            <header>
                <div className="container">
                    <div className="profile">
                        <div className="profile-image">
                            <img src={image} alt="profile" className="profile-logo" />
                        </div>
                        <div className="profile-user-settings">
                            <h1 className="profile-user-name">{this.username }</h1>
                            <button className="btn profile-edit-btn">Edit Profile</button>
                            <button className="btn profile-settings-btn" aria-label="profile settings">
                                <i className="fa fa-cog" aria-hidden="true"/></button>
                        </div>
                        <div className="profile-stats">
                            <ul>
                                <li><span className="profile-stat-count">{countPost}</span> posts</li>
                                <li><span className="profile-stat-count">188</span> followers</li>
                                <li><span className="profile-stat-count">206</span> following</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <main>

                <div className="container">

                    <div className="gallery">

                     {this.state.array_post}
                        <div></div>
                        <div></div>

                    </div>
                </div>


            </main>


        </div>
    );


    }
}
const mapStateToProps = (state) => {
    return state;
}
export default withRouter(connect(mapStateToProps)(Profile));