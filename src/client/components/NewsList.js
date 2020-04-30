import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { fetchNews } from "../actions";

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        upvotedItems: [],
    };
  }
  componentDidMount() {
    this.props.fetchNews();
    //check if any items exist in localStorage
    this.setState({
      upvotedItems: Object.keys(window.localStorage)
    });
  }

  //set upvotes items in local storage
  upvote(item) {
    if (window !== undefined) {
      let keys =  this.state.upvotedItems;
      if(!keys.includes(item.objectID)){
         window.localStorage.setItem(item.objectID, item.title);
         this.setState({
            upvotedItems: [...this.state.upvotedItems, item.objectID]
          });
      }else{
        let newState = this.state.upvotedItems.filter(state => state !== item.objectID);
        this.setState({
            upvotedItems: newState
        }) 
        window.localStorage.removeItem(item.objectID);
      }
    }
  }
 getDomain(url){
  var domain = '';
  if (typeof url === 'string') {
      return domain = url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split(/[/?#]/)[0];
  }
 }
  renderNews() {
    return this.props.news.filter(item => item.title !== null && item.url !== null && item.title !== '').map((item) => {
      return (
        <li key={item.objectID}>
          <span className="color-dark">{item.num_comments !== null ? item.num_comments: 0}</span>
          <span className="color-dark">{item.points}</span>
          <span
            style={{
              borderBottomColor: this.state.upvotedItems !== undefined && this.state.upvotedItems.includes(item.objectID) ? "#ff6600" : "rgb(202, 202, 201)",
            }}
            onClick={() => this.upvote(item)}
            className="hn-upvote-btn">
          </span>
          <a className="color-dark" href={item.url}>{item.title}<span>({this.getDomain(item.url)})</span></a>
           by
          <span className="color-dark">{item._highlightResult.author.value}</span>
          {moment(Date.now()).diff(moment(item.created_at), 'days')}{' '}
          days ago
        </li>
      );
    });
  }

  render() {
    return (
      <main>
        <ul>{this.renderNews()}</ul>
        <button onClick={() => this.props.fetchNews(2)}>Next page</button>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.news,
  };
}

function loadData(store) {
  return store.dispatch(fetchNews());
}

export { loadData };

export default connect(mapStateToProps, { fetchNews })(NewsList);
