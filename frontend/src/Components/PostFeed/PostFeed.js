import React from "react";
import Comment from "./Comment";
import { connect } from "react-redux";
import { getPostThunk } from "../../Actions/getPostActions";

class PostFeed extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getPostThunk());
  }

  render() {
    let postList = "No Posts Found";
    if(this.props.getPostReducer.data) {
      postList = this.props.getPostReducer.data.map((e, i) => {
      let likeCheck = false;
      let likecount = e.likes.count
        const items = []
        console.log(e.tags)
        e.tags.forEach(element => items.push(<a href={'/tags/' + element.name}>#{element.name} </a>))
        let avatar
        try {
          if (e.owner.avatar.includes("nginx")) {
            avatar = "http://localhost:4433" + e.owner.avatar.replace("/nginx", "");
          } else {
            avatar = e.owner.avatar
          }
        }catch (e) {
          avatar = e.owner.avatar
        }


      return (<div key={i} className="post">
        <div className="caption">
          <img  src={avatar} alt="dp" className="user" />
          <h4 className="caption-text">{e.title}</h4>
        </div>
        <img onDoubleClick={() => {console.log("aa"); likeCheck = true } } src={e.image} alt="Post" className="post-image" />
        <div className="caption">
          <img  src={"http://localhost:4433" + e.owner.avatar.replace("/nginx", '')} alt="dp" className="user" />
          <h4 className="caption-text">{e.owner.name}: {e.content}  </h4>
        </div>
        <div>{items}</div>
      </div>);
    }).reverse();
    }
    //<Comment isLiked={likeCheck} likes={likecount}  comments={e.comments} timestamp={e.time}

   /* if(this.props.getPostReducer.data){
      postList = this.props.getPostReducer.data.map((e, i) => {
        let likeCheck = false;
        let likecount = 0;
        if(likeCheck){
          likecount = e.likes + 1;
        }else{
          likecount = e.likes;
        }
        return (<div key={i} className="post">
          <div className="caption">
            <img  src={userImage} alt="dp" className="user" />
            <h4 className="caption-text">{e.caption}</h4>
          </div>
          <img onDoubleClick={() => {console.log("aa"); likeCheck = true } } src={e.image_url} alt="Post" className="post-image" />
          <Comment isLiked={likeCheck} likes={likecount} comments={e.comments} timestamp={e.time} />
        </div>);
      }).reverse();
    }*/

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