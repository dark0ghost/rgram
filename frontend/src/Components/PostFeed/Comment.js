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
    if(this.state.isLiked == false){
      this.setState({
        likes: this.state.likes + 1,
        isLiked: true
      })
    }
  }


  render() {
    const commentList = this.props.comments.map((e, i) => {
      return (
        <h4 className="comment" key={i}>
          {e}
        </h4>
      );
    });

    function timeDifference(previous) {
      var current = Date.now();
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - previous;

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + " seconds ago";
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " minutes ago";
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + " hours ago";
      } else if (elapsed < msPerMonth) {
        return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
      } else if (elapsed < msPerYear) {
        return (
          "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
        );
      } else {
        return (
          "approximately " + Math.round(elapsed / msPerYear) + " years ago"
        );
      }
    }
    
    return (
      <div className="comment-area">
        <div className="icon-area">
          <i className={this.state.isLiked ? "fa fa-heart heart" : "fa fa-heart-o"} onClick={this.like} />
          <i className="fa fa-comment-o" />
        </div>
        <h4>{this.state.likes} Likes</h4>
        {commentList}
        <h4 className="timestamp">{timeDifference(this.props.timestamp)}</h4>
        <hr />
        <input type="text" className="add-comment" placeholder="Add Comments" />
      </div>
    );
  }
}

export default Comment;