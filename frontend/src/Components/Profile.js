import {Component} from "react";
import "./Profile.css"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Profile extends Component{


    render_image(){

        let response =     ( <div className="gallery-item" tabIndex="0">
            <img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop"
                 className="gallery-image" alt=""/>
            <div className="gallery-item-type">
                <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true"></i>
            </div>
            <div className="gallery-item-info">
                <ul>
                    <li className="gallery-item-likes"><span
                        className="visually-hidden">Likes:</span><i className="fas fa-heart"
                                                                    aria-hidden="true"></i> 52
                    </li>
                    <li className="gallery-item-comments"><span
                        className="visually-hidden">Comments:</span><i className="fas fa-comment"
                                                                       aria-hidden="true"></i> 4
                    </li>
                </ul>

            </div>
        </div>)

    }


    render() {
        let username = localStorage.getItem('username');
        let image = localStorage.getItem('avatar').replace("8000","4433").replace("/nginx","")
        return (
        <div className="set" >
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
            <main>

                <div className="container">

                    <div className="gallery">



                        <div className="gallery-item" tabIndex="0">
                            <img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop"
                                 className="gallery-image" alt=""/>
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true"></i>
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes"><span
                                        className="visually-hidden">Likes:</span><i className="fas fa-heart"
                                                                                    aria-hidden="true"></i> 52
                                    </li>
                                    <li className="gallery-item-comments"><span
                                        className="visually-hidden">Comments:</span><i className="fas fa-comment"
                                                                                       aria-hidden="true"></i> 4
                                    </li>
                                </ul>

                            </div>
                    </div>



                        <div className="gallery-item" tabIndex="0">
                            <img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop"
                                 className="gallery-image" alt=""/>
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true"></i>
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes"><span
                                        className="visually-hidden">Likes:</span><i className="fas fa-heart"
                                                                                    aria-hidden="true"></i> 52
                                    </li>
                                    <li className="gallery-item-comments"><span
                                        className="visually-hidden">Comments:</span><i className="fas fa-comment"
                                                                                       aria-hidden="true"></i> 4
                                    </li>
                                </ul>

                            </div>
                        </div>



                        <div className="gallery-item" tabIndex="0">
                            <img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop"
                                 className="gallery-image" alt=""/>
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true"></i>
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes"><span
                                        className="visually-hidden">Likes:</span><i className="fas fa-heart"
                                                                                    aria-hidden="true"></i> 52
                                    </li>
                                    <li className="gallery-item-comments"><span
                                        className="visually-hidden">Comments:</span><i className="fas fa-comment"
                                                                                       aria-hidden="true"></i> 4
                                    </li>
                                </ul>

                            </div>
                        </div>








                    </div>
                </div>


            </main>


        </div>
    );


    }
}
const mapStateToProps = (state) => {
    return state;
}
export default withRouter(connect(mapStateToProps)(Profile));