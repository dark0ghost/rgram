import React from "react";
import './AddPost.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPostThunk } from '../Actions/addPostActions'

class AddPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: "",
      title: "",
      user: "",
      content: "",
      tags: "",
      image_as: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  handleFileChange = e => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0])
    this.setState({
      [e.target.name]: e.target.files[0],
      image_as: image_as_base64
    })
  }

  handleChange(e){
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name] : value
    })
  }


  addPost(){
    const input = {
      image: this.state.image,
      title: this.state.title,
      user: localStorage.getItem('id_user'),
      content: this.state.content,
      tags: this.state.tags
    };
    this.props.dispatch(addPostThunk(input,this.props.history));
  }

  prew = () => {
    if(this.state.image_as){
      return<img src={this.state.image_as} alt="preview" width="50"/>
    }
    return <div/>
  }

  render() {
    return (
      <div className="post-area">
        <div className="add-post-area">
          <h1>create post</h1>
          <input type="file" name="image" multiple accept="image/*,image/jpeg"  width="500" onChange={this.handleFileChange}  required />
          <this.prew />
          <textarea name="title" value={this.state.title} onChange={this.handleChange} className="enter_caption" placeholder="title" />
          <textarea name="content" value={this.state.content} onChange={this.handleChange} className="enter_caption" placeholder="content" />
          <textarea name="tags" value={this.state.tags} onChange={this.handleChange} className="enter_caption" placeholder="tags" />
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