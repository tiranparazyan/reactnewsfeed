import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router'

import InfiniteScroll from 'react-infinite-scroller';
import { fetchNews } from '../actions/index';

let interval;

class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            currentPage: 1
        };

        interval = setInterval(() => {
             this.props.fetchNews(this.state.currentPage)
                .then(() => {
                    this.setState({news: this.props.news})
                })
        }, 30000);

    }

    componentWillMount() {
        if(!this.props.news.length) {
            this.props.fetchNews(this.state.currentPage)
                .then(() => {
                    this.setState({news: this.props.news})
                })
        }
        else {
            this.setState({news: this.props.news})
        }

    }
    componentWillUnmount() {
        clearInterval(interval);
    }

    loadMore() {

        let currentPage = this.state.currentPage;
        currentPage++;
        this.setState({currentPage});
        this.props.fetchNews(this.state.currentPage)
            .then(() => {
                this.setState({news: this.props.news})
                console.log(this.props.news)
            })

    }

    render() {
        if(!this.state.news.length) {
            return <div>Loading...</div>
        }
        return (
            <div>

                <div className={this.props.favorites.length? 'scrollable': 'none'}>
                    {this.props.favorites.map((value, key) => {
                        return (
                            <div key={key} className="tabs">
                                <Link to={`/${value.id}`} >{value.webTitle}</Link>
                            </div>
                            )
                    })}
                </div>
                <div>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th className="col-xs-3">Image</th>
                                <th className="col-xs-6">Title</th>
                                <th className="col-xs-3">Category</th>
                            </tr>
                            </thead>


                            <InfiniteScroll
                                pageStart={this.state.currentPage}
                                hasMore={true || false}
                                isReverse={false}
                                initialLoad={false}
                                threshold={0}
                                loadMore={() => this.loadMore()}
                                loader={<tr className="loader"><td>Loading ...</td></tr>}
                                element="tbody"
                            >
                                {this.state.news.map((value, key) => {
                                    return (<tr key={key}>
                                        <td className="col-xs-3">
                                            <img src={value.fields? value.fields.thumbnail: ''} style={{width:'100%'}} />
                                        </td>
                                        <td className="col-xs-6">
                                            <Link to={`/${value.id}`}>
                                                {value.webTitle}
                                            </Link>

                                        </td>

                                        <td className="col-xs-3">
                                            {value.sectionName}
                                        </td>
                                    </tr>)
                                })}

                            </InfiniteScroll>



                        </table>



                </div>




            </div>
        )
    }
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchNews }, dispatch)
}

function mapStateToProps({news, favorites}) {
    return { news, favorites };
}

export default connect( mapStateToProps, mapDispatchToProps )(NewsList);