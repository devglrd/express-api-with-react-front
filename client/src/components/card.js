import React, {Component} from 'react';
import axios from "axios/index";
import Modal from "./modal";

// import fetchData from "./../api";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            enableComment : false,
            postSelect : [],
            displayModal : false
        }
    }

    componentWillReceiveProps(props) {
        console.log("props", props);
        if (this.state.posts.length === 0) {
            this.setState({
                posts: props.posts
            })
        } else if (this.state.posts !== props.posts) {
            this.setState({
                posts: props.posts
            })
        }
    }

    renderAuthor = (el) => {
        if (el.author[0]) {
            return (
                <p className="card-text">
                    <small className="text-muted mr-1">{el.author[0].name}</small>
                    <small className="text-muted">{el.author[0].stars} ★</small>
                </p>
            )
        } else {
            return (
                <p>
                    Aucun auteur
                </p>
            )
        }
    }

    delete = (el) => {
        console.log(el);
        let arrposts = this.state.posts;
        let cuid = el.cuid;
        let url = `http://127.0.0.1:9000/api/posts/delete/${cuid}`;
        let index = arrposts.indexOf(el);
        console.log(index);
        if (index > -1){
            arrposts.splice(index, 1);
            console.log("splice ");
        }
        console.log(arrposts);
        axios.post(url).then((succ) => {
            console.log(succ);
            this.setState({
                posts : arrposts
            })
        })
    }

    handleComment = () => {
        this.setState({enableComment : !this.state.enableComment})
    }

    renderComment = (val) => {
        if (val){
            return (
                <div className="my-3">
                    <input type="text" placeholder="Votre commentaire"/>
                    <button className="btn mt-3">Commenter</button>
                </div>

            )
        }
    }

    componentDidMount(){

    }

    render() {

        let renderPosts = this.state.posts.map((el, index) => (
            <div className="col-md-6 justify-content-center aligns-items-center d-flex" key={el.cuid}>
                <div key={el.cuid} className="card mb-2 w-75 shadow-sm">
                    <div className="card-header">
                        <button type="button" onClick={this.delete.bind(this, el)} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 id="target">{el.title}</h4>
                    </div>
                    <div className="card-body">
                        <p>{el.content}</p>
                    </div>
                    <div className="card-footer">
                        {this.renderAuthor(el)}
                        <span>
                            <button className="btn btn-outline-info mr-2">Edit</button>
                            <button className="btn btn-outline-info" onClick={this.handleComment}>Comment</button>
                        </span>
                        {this.renderComment(this.state.enableComment)}
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="col-md-8">
                <div className="row">
                    {renderPosts}
                    <Modal postSelected={this.state.postSelect} display={this.state.displayModal} />
                </div>
            </div>
        );
    }
}


export default Card;
