import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Parser from 'html-react-parser';

import axios from 'axios';
import { API_KEY } from '../actions/index';
import { favoritesList } from '../actions/favorites-action';
let time;

class NewsContent extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            selected:null,
            alreadyPinned: false,
            showNotification:false
        }

    }

    componentWillMount() {

        if(!this.props.state.news.length) return false;
        const selected = this.props.state.news.filter((value) => {
            return value.id === this.props.params.splat;
        })

        this.setState({selected})

        if(this.props.state.favorites.length) {

             this.props.state.favorites.filter((value) => {
                if(value.id == selected[0].id) {
                    this.setState({ alreadyPinned: true })
                }
            })

        }
        axios.get(`${selected[0].apiUrl}?api-key=${API_KEY}&show-blocks=all`).then((res) => {
            this.setState({content: res.data.response.content.blocks.body[0].bodyHtml})
        })
    }
    componentWillUnmount() {
        clearTimeout(time);
    }


    pinToFavourites() {
        this.setState({alreadyPinned:true, showNotification:true})
        this.props.favoritesList(this.state.selected)
        time = setTimeout(() => {this.setState({showNotification: false})}, 2500)
    }

    render() {
        let alertDanger = {color:'red'};
        let navigate = {margin: "20px"};
        let pinButton = {float: 'right'};
        let notify = {padding: '25px', position:'absolute', bottom:'20px', right: '20px', background:'green', color:'white'};
        if(!this.props.state.news.length) {
            return (
                <div>
                    <Link to="/" className="btn btn-primary" style={navigate}>Back</Link>
                    <div style={alertDanger}>You cannot access the news directly, use the navigation from the home page</div>
                </div>


            )
        }

        return (
            <div>
                <div>
                    <div style={navigate}>
                        <Link to="/" className="btn btn-primary ">Back</Link>
                        {
                            !this.state.alreadyPinned?
                                <button
                                    className="btn btn-danger"
                                    style={pinButton}
                                    onClick={(event) => this.pinToFavourites()}>
                                        Add to favorites
                                </button>: ''


                        }

                    </div>


                </div>
                <div>
                    {this.state.selected[0].hasOwnProperty('fields')? <img className="content-img" src={this.state.selected[0].fields.thumbnail} />: '' }
                    <div>
                        { this.state.content? Parser(this.state.content): '' }
                    </div>

                </div>

                {
                    this.state.showNotification?
                        <div style={notify}>The article has been pinned</div>: ''
                }
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {state}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ favoritesList }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsContent);