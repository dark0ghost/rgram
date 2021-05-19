import React from "react";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";

class Comment extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data_render: {},
      name: this.props.match.params.name,
        username: localStorage.getItem("username")
    }
  }

  componentDidMount() {
      axios.get("/api/post_with_id/"  + this.state.name, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then(res => res.data)
            .then(json => {
                console.log(json, this.state.name)
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
      console.log(this.state.data_render)
      if(this.state.data_render) {
          console.log(this.state.data_render)
          let likeCheck
          this.state.data_render.likes.forEach(element => likeCheck |= element.username === this.state.username);
          let likeCount = this.state.data_render.likes.length;
          const items = [];
          this.state.data_render.tags.forEach((element) => items.push(<a
              href={'/tags/' + element.name}>#{element.name} </a>));
          let avatar;
          try {
              if (this.state.data_render.owner.avatar.includes("nginx")) {
                  avatar = "http://localhost:4433" + this.state.data_render.owner.avatar.replace("/nginx", "");
              } else {
                  avatar = this.state.data_render.owner.avatar
              }
          } catch (e) {
              avatar = this.state.data_render.owner.avatar
          }

          postList =  (<div key={this.state.name} className="post">
              <div className="caption">
                  <img  src={avatar} alt="dp" className="user" />
                  <h4 className="caption-text">{ this.state.data_render.title}</h4>
              </div>
              <img onDoubleClick={() => this.sendLike(this.state.data_render.id)} src={ this.state.data_render.image} alt="Post" className="post-image" />
              {this.getRenderLike(likeCount, likeCheck,  this.state.data_render.id)}
              <div className="caption">
                  <img  src={"http://localhost:4433" +  this.state.data_render.owner.avatar.replace("/nginx", '')} alt="dp" className="user"   />
                  <h4 className="caption-text fix-image">{ this.state.data_render.owner.name}: { this.state.data_render.content}  </h4>
              </div>
              <div className="tag">{items}</div>
          </div>);

      }
    return (
       postList
    );

  }
}

export default Comment;