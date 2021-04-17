import React from "react";
import './AddPost.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPostThunk } from '../Actions/addPostActions'

class AddPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: "",
      caption: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name] : value
    })
  }

  addPost(){
    var input = {
      url: this.state.url,
      caption: this.state.caption
    }
    this.props.dispatch(addPostThunk(input,this.props.history));
    this.setState({
      url: "",
      caption: ""
    })
  }

  render() {
    return (
      <div className="post-area">
        <div className="add-post-area">
          <h1>Enter details to Post</h1>
          <input type="text" name="url" value={this.state.url} onChange={this.handleChange} placeholder="Enter Image URL" className="image_url" />
          <textarea name="caption" value={this.state.caption} onChange={this.handleChange} className="enter_caption" placeholder="Enter Image Caption" />
          <h4 className="msg">{this.props.addPostReducer.msg}</h4>
          <button className="add-post post-btn" onClick={this.addPost}>Post</button>
          <Link to="/"><button className="cancel-post cancel-btn">Cancel</button></Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
}
export default withRouter(connect(mapStateToProps)(AddPost));