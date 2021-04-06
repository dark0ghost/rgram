import RenderPanel from "../headerPanel";
import "./profile.css"

function getProfile (name,like,followers,post){
    return (
       <div>
           <RenderPanel />
        <section>

                <div className="profile">

                    <div className="profile-image">

                        <img
    src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
    alt={1}/>

                    </div>

                    <div className="profile-user-settings">

                        <h1 className="profile-user-name">janedoe_</h1>

                        <button className="btn profile-edit-btn">Edit Profile</button>

                        <button className="btn profile-settings-btn" aria-label="profile settings">
                            <i className="fas fa-cog" aria-hidden="true"/></button>

                    </div>

                    <div className="profile-stats">

                        <ul>
                            <li><span className="profile-stat-count">164</span> posts</li>
                            <li><span className="profile-stat-count">188</span> followers</li>
                            <li><span className="profile-stat-count">206</span> following</li>
                        </ul>

                    </div>

                    <div className="profile-bio">

                        <p><span className="profile-real-name">Jane Doe</span> Lorem ipsum dolor sit, amet consectetur
                            adipisicing elit 📷✈️🏕️</p>

                    </div>

                </div>

        </section>
           </div>
    );
}
export default getProfile;