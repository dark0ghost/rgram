import React, {Component} from "react";
import "./Profile.css"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";

class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: localStorage.getItem('username'),
            name: this.props.match.params.name,
            array_post: [],
            user_data: [],
            user_subscribes: [],
            follows: []
        }

        this.getUserData = this.getUserData.bind(this)
        this.getUserSubscribes = this.getUserSubscribes.bind(this)
    }

    getFollows(){
        fetch("/api/get_subscribes/" + this.state.name, {
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

    getUserData(){
        fetch("/api/user_data/" + this.state.name, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                }
             }
        ).then(r => r.json()).then(json => {
            this.setState({user_data: json[0]});

        })
    }

    getUserSubscribes(){
        fetch("/api/user_subscribes/" + this.state.name, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                }
            }
        ).then(r => r.json()).then(json => {
            this.setState({user_subscribes: json});
        })
    }


    componentDidMount() {
        fetch('/api/user_post/' + this.state.name , {
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
        this.getUserData();
        this.getUserSubscribes();
        this.getFollows()
    }


    subscribe = () =>{
        axios.post("/api/subscribes/" + this.state.name ,{}, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }
        )
    }
    renderSubscribeIcon  = (follows) =>{
         if(!follows) {
           return  <Checkbox icon={<SubscriptionsIcon/>}
                       checkedIcon={<UnsubscribeIcon/>}
                       name="checkedH"
                       onChange={(event) => {this.subscribe() }}/>
         }
         return <Checkbox icon={<UnsubscribeIcon/>}
                          checkedIcon={<SubscriptionsIcon/>}
                          name="checkedH"
                          onChange={(event) => {this.subscribe() }}/>
    }




    render() {
        let image = localStorage.getItem('avatar').replace("8000","4433").replace("/nginx","");
        let countPost = this.state.array_post.length;
        if(this.state.username === this.state.name){
            return window.location = "/profile";
        }
        let follows = 0;
        this.state.follows.forEach(e => follows = e.follows.length)
        let followers = 0;
        this.state.user_subscribes.forEach(e => followers = e.follows.length)
        let subscribesCheck = false;
        if (follows !== 0) {
            this.state.follows[0].follows.forEach(element => subscribesCheck |= element.username === this.state.username);
        }
        return (
            <div className="set" >
                <header>
                    <div className="container">
                        <div className="profile">
                            <div className="profile-image">
                                <img src={image} alt="profile" className="profile-logo" />
                            </div>
                            <div className="profile-user-settings">
                                <h1 className="profile-user-name">{this.state.user_data.name}</h1>
                            </div>
                            {this.renderSubscribeIcon(subscribesCheck)}
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
export default withRouter(connect(mapStateToProps)(User));