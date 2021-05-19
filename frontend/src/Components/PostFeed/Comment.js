import React from "react";

class Comment extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      likes: this.props.likes,
      isLiked: this.props.isLiked
    }
    this.like = this.like.bind(this);
  }

  like(){
    if(!this.state.isLiked){
      this.setState({
        likes: this.state.likes + 1,
        isLiked: true
      })
    }
  }


  render() {

  }
}

export default Comment;