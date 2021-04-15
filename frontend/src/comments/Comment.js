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
    if(this.state.isLiked){
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
      const current = Date.now();
      const msPerMinute = 60 * 1000;
      const msPerHour = msPerMinute * 60;
      const msPerDay = msPerHour * 24;
      const msPerMonth = msPerDay * 30;
      const msPerYear = msPerDay * 365;

      const elapsed = current - previous;

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + " seconds ago";
      }
      if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " minutes ago";
      }
      if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + " hours ago";
      }
      if (elapsed < msPerMonth) {
        return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
      }
      if (elapsed < msPerYear) {
        return (
          "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
        );
      }

        return (
          "approximately " + Math.round(elapsed / msPerYear) + " years ago"
        );
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