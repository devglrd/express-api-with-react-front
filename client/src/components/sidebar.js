import React, {Component} from 'react';
// import fetchData from "../api";
class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            authors : [],
            author : []
        }
    }

    componentWillReceiveProps(props){
        console.log("props", props);
        if (this.state.authors.length === 0){
            this.setState({
                authors : props.authors
            })
        }else{
            this.setState({
                author : props.author
            })
        }
        // if (this.state.posts === null){
        //     console.log("ijzddazijdazijdazidza")
        // }
    }


    render() {
        let renderAuthors = this.state.authors.map((el, index) => (
            <div key={el.cuid} onClick={this.props.chooseAuthor.bind(this, el)} style={{cursor: "pointer"}}>
                <span>{el.name}</span>
            </div>
        ))
        return (
            <div className="col-md-2">
                <div className="d-flex flex-column justify-content-center align-items-center mb-5">
                    <span>Vous ecrivez en tant que </span>
                    <span className="text-success">{this.state.author.name ? this.state.author.name  : 'Aucun auteur' }</span>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <span>List des auteurs</span>
                    <div className="">{renderAuthors}</div>
                </div>
            </div>
        );
    }
}


export default Sidebar;
