import React, {Component} from "react";
import "./Profile.css"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
import {ProfilePost} from "./PostFeed/ProfilePost";

class Profile extends Component{
    constructor(props){
        super(props);
        this.username = localStorage.getItem('username');
        this.state = {
            array_post : [],
            user_subscribes: [],
            follows: []
        }
        this.getUserSubscribes = this.getUserSubscribes.bind(this)
        this.getFollows =  this.getFollows.bind(this)
    }

    getUserSubscribes(){
        fetch("/api/user_subscribes/" + this.username, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                }
            }
        )
            .then(r => r.json())
            .then(json => {
            console.log(json)
            this.setState({user_subscribes: json});
        })
    }

    getFollows(){
        fetch("/api/get_subscribes/" + this.username, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                }
            }
        ).then(r => r.json()).then(json => {
            this.setState({follows: [json]});
        })
    }


    sendLike = (id_post) =>{
        axios.post("/api/add_like/" + id_post,{}, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }
        )
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
                    let likeCheck
                    element.likes.forEach(element => likeCheck |=  element.username === this.state.username);
                    let response = (
                        <ProfilePost countLike={element.likes.length}  countComments={element.comments.length} image={element.image} checkLike={likeCheck} id_post={element.id}/>
                    );
                    this.setState({array_post: this.state.array_post.concat([response])})
                })
            });
        this.getUserSubscribes();
        this.getFollows();
    }




    render() {
        let image = localStorage.getItem('avatar').replace("8000","4433").replace("/nginx","");
        let countPost = this.state.array_post.length;
        let follows = 0;
        this.state.follows.forEach(e => follows = e.follows.length)
        let followers = 0;
        this.state.user_subscribes.forEach(e => followers = e.follows.length)
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
                                <li><span className="profile-stat-count">{followers}</span> followers</li>
                                <li><span className="profile-stat-count">{follows}</span> following</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <main>

                <div className="container">

                    <div className="gallery">

                     {this.state.array_post}
                        <div/>
                        <div/>

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