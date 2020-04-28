import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { fetchNews } from '../actions';


class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upvotedItems: []        
        }
    }
    componentDidMount(){
        this.props.fetchNews()
    }

    renderNews(){
        console.log(this.props)
        return this.props.news.map((news)=>{
        return <li>{news.title}</li>
        })
    }

    render(){
        return(
            <div>
                Hellooo
                <ul>{this.renderNews()}</ul>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        news: state.news
    }
}

export default connect(mapStateToProps, { fetchNews })(NewsList);