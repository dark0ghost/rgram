import React, {Component} from "react";
import {getPostThunk} from "../../Actions/getPostActions";
import {connect} from "react-redux";


class Tag extends Component {

    constructor(props){
        super(props);
        this.state = {
            data_render: {}
        }
    }



    componentDidMount() {
       fetch("/api/tag/" + this.props.match.params.name, {
           headers: {
               Authorization: `JWT ${localStorage.getItem('token')}`
           }
       }).then(res => res.json())
           .then(json => {
               this.setState({data_render: json})
           })
   }


    render() {
        let postList = "No Posts Found";
        if(this.state.data_render) {
            let res = [];
            Object.values(this.state.data_render).forEach((e, i) => {
                let likeCheck = false;
                let likecount = e.likes.count
                const items = []
                e.tags.forEach(element => items.push(<a href={'/tags/' + element}>#{element} </a>))


                res.push(<div key={i} className="post">
                    <div className="caption">
                        <img  src={"http://localhost:4433" + e.user.avatar.replace("/nginx", '')} alt="dp" className="user" />
                        <h4 className="caption-text">{e.title}</h4>
                    </div>
                    <img onDoubleClick={() => {console.log("aa"); likeCheck = true } } src={e.image} alt="Post" className="post-image" />
                    <div className="caption">
                        <img  src={"http://localhost:4433" + e.user.avatar.replace("/nginx", '')} alt="dp" className="user" />
                        <h4 className="caption-text">{e.user.name}: {e.content}  </h4>
                    </div>
                    <div>{items}</div>
                </div>);
            });
            return (<div className="post-area" >
                {res.reverse()}
            </div>)
        }
        //<Comment isLiked={likeCheck} likes={likecount}  comments={e.comments} timestamp={e.time}

        /* if(this.props.getPostReducer.data){
           postList = this.props.getPostReducer.data.map((e, i) => {
             let likeCheck = false;
             let likecount = 0;
             if(likeCheck){
               likecount = e.likes + 1;
             }else{
               likecount = e.likes;
             }
             return (<div key={i} className="post">
               <div className="caption">
                 <img  src={userImage} alt="dp" className="user" />
                 <h4 className="caption-text">{e.caption}</h4>
               </div>
               <img onDoubleClick={() => {console.log("aa"); likeCheck = true } } src={e.image_url} alt="Post" className="post-image" />
               <Comment isLiked={likeCheck} likes={likecount} comments={e.comments} timestamp={e.time} />
             </div>);
           }).reverse();
         }*/

        return (
            <div className="post-area" >
                {postList}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Tag);