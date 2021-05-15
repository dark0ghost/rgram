import {Component} from "react";
import "./Profile.css"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Profile extends Component{


    render() {
    let username = localStorage.getItem('username');
    let image = localStorage.getItem('avatar').replace("8000","4433").replace("nginx","")
    return(
        <div>
        <div className="set-font" style={{fontSize: '10px'}}>
            <header>
                <div className="container">

                    <div className="profile">

                        <div className="profile-image">

                            <img src={image} alt="profile" className="profile-logo" />

                        </div>

                        <div className="profile-user-settings">

                            <h1 className="profile-user-name">{username}</h1>

                            <button className="btn profile-edit-btn">Edit Profile</button>

                            <button className="btn profile-settings-btn" aria-label="profile settings">
                                <i className="fas fa-cog" aria-hidden="true"></i></button>

                        </div>

                        <div className="profile-stats">

                            <ul>
                                <li><span className="profile-stat-count">164</span> posts</li>
                                <li><span className="profile-stat-count">188</span> followers</li>
                                <li><span className="profile-stat-count">206</span> following</li>
                            </ul>

                        </div>

                    </div>

                </div>

            </header>
        </div>
        </div>
    );

    }
}
const mapStateToProps = (state) => {
    return state;
}
export default withRouter(connect(mapStateToProps)(Profile));