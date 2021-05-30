import React, {Component} from "react";
import { connect } from "react-redux";
import { getPostThunk } from "../../Actions/getPostActions";
import { Moment} from "../PostComponents/PostView"
import axios from "axios";

class PostFeed extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username")
    }
  }

  componentDidMount() {
    this.props.dispatch(getPostThunk());
  }

  sendLike = (id_post) =>{
    axios.post("/api/add_like/" + id_post,{}, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        }
     )
  }

  render() {
    let postList = "No Posts Found";
    if(this.props.getPostReducer.data) {
      postList = this.props.getPostReducer.data.map((e, i) => {
        let likeCheck
        e.likes.forEach(element => likeCheck |=  element.username === this.state.username);
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
        return(
            <Moment id_post={e.id} renderName={e.owner.name} renderUserName={e.owner.username} content={e.content} title={e.title} keyPost={i} tags={items} image={e.image} avatar={avatar}/>
        );
    }).reverse();
    }

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
export default connect(mapStateToProps)(PostFeed);