import React from "react";
import {addPostThunk} from "../Actions/addPostActions";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";


class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            caption: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    addUser(){
        const input = {
            url: this.state.url,
            caption: this.state.caption
        };
        this.props.dispatch(addPostThunk(input,this.props.history));
        this.setState({
            url: "",
            caption: ""
        })
    }

    render() {
        return (
            <div className="register-user">
                <input type="text" name="url" value={this.state.url} onChange={this.handleChange} placeholder="Enter Image URL" className="image_url" />
                <textarea name="caption" value={this.state.caption} onChange={this.handleChange} className="enter_caption" placeholder="Enter Image Caption" />
                <Link to="/"><button className="cancel-post cancel-btn">Cancel</button></Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default withRouter(connect(mapStateToProps)(RegisterUser));