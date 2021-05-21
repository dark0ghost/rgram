import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";


class Tag extends Component {

    constructor(props){
        super(props);
        this.state = {
            data_render: {},
            username: localStorage.getItem("username")
        }
    }

    componentDidMount() {
       fetch("/api/tag/" + this.props.match.params.name, {
           headers: {
               Authorization: `JWT ${localStorage.getItem('token')}`
           }
       }).then(res => res.json())
           .then(json => {
               this.setState({data_render: json})
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
        let postList = "No Posts Found";
        if(this.state.data_render) {
            postList = Object.values(this.state.data_render).map((e, i) => {
                let likeCheck
                e.likes.forEach(element => likeCheck |=  element.username === this.state.username);
                let likecount = e.likes.length;
                const items = [];
                e.tags.forEach((element) => items.push(<a href={'/tags/' + element.name}>#{element.name} </a>));
                let avatar;
                try {
                    if (e.owner.avatar.includes("nginx")) {
                        avatar = "http://localhost:4433" + e.owner.avatar.replace("/nginx", "");
                    } else {
                        avatar = e.owner.avatar
                    }
                }catch (e) {
                    avatar = e.owner.avatar
                }
                return (
                    <div key={i} className="post">
                        <div className="caption">
                            <img  src={avatar} alt="dp" className="user" />
                            <h4 className="caption-text">{e.title}</h4>
                        </div>
                        <img onDoubleClick={() => this.sendLike(e.id)} src={e.image} alt="Post" className="post-image" />
                        {this.getRenderLike(likecount, likeCheck, e.id)}
                        <div className="caption">
                            <img  src={"http://localhost:4433" + e.owner.avatar.replace("/nginx", '')} alt="dp" className="user"   />
                            <h4 className="caption-text fix-image">{e.owner.name}: {e.content}  </h4>
                        </div>
                        <div className="tag">{items}</div>
                    </div>);
            }).reverse();
        }
        //<Comment isLiked={likeCheck} likes={likecount}  comments={e.comments} timestamp={e.time}

        return (
            <div className="post-area" >
                {postList}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Tag);