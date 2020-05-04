import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { fetchNews } from "../actions";


class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        upvotedItems: [],
        hiddenItems: [],
        page: 1,
    };
    this.handlePaginationNext = this.handlePaginationNext.bind(this);
    this.handlePaginationPrev = this.handlePaginationPrev.bind(this);

  }
  componentDidMount() {
    this.props.fetchNews();
    //check if any items exist in localStorage
    this.setState({
      upvotedItems: JSON.parse(window.localStorage.getItem('upvotes')) || []
      // hiddenItems:  JSON.parse(window.localStorage.getItem('hidden')) || []
    });
  }

  getPoints(id){
    let upvotes = this.state.upvotedItems
    for(var i = 0; i < upvotes.length; i++) {
    if (upvotes[i].id == id) {
          return upvotes[i].points;
      }
  }
  }

  checkElement(id){
    var found = false;
    let upvotes = this.state.upvotedItems
    for(var i = 0; i < upvotes.length; i++) {
        console.log(id + ' : ' + upvotes[i].id)
      if (upvotes[i].id == id) {
            return found = true;
        }
    }
  }
  //set upvotes items in local storage
  upvote(item) {
    if (window !== undefined) {
      let keys =  this.state.upvotedItems;
      let newItem = {
        id: item.objectID,
        points: item.points + 1
      }
      if(!keys.includes(item.objectID)){
        window.localStorage.setItem('upvotes', JSON.stringify([...this.state.upvotedItems, newItem]));
         this.setState({
            upvotedItems: [...this.state.upvotedItems, newItem]
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

  //hide upvotedItems
  hideItems(item) {
    if (window !== undefined) {
      let keys =  this.state.hiddenItems;
      if(!keys.includes(item.objectID)){
        this.setState({
          hiddenItems: [...this.state.hiddenItems, item.objectID]
         });
         window.localStorage.setItem('hidden', JSON.stringify([...this.state.hiddenItems, item.objectID]));
      }
    }
  }

 //populate domain name 
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

 handlePaginationNext(){
   let totalPages = this.props.pages
   this.setState({
     page: this.state.page++ < totalPages ? this.state.page++ : 1
   }, ()=> this.props.fetchNews(this.state.page))
 }

 handlePaginationPrev(){
  let totalPages = this.props.pages
  this.setState({
    page: this.state.page-- > 0 ? this.state.page-- : 1
  }, ()=> this.props.fetchNews(this.state.page))
}

  renderNews() {
    return this.props.news.hits.filter(item => item.title !== null && item.url !== null && item.title !== '')
    .filter(item => !this.state.hiddenItems.includes(item.objectID))
    .map((item) => {
      return (
        <li key={item.objectID}>
          <p>
            <span className="color-dark">{item.num_comments !== null ? item.num_comments: 0}</span>
            <span style={{color: this.getPoints(item.objectID)? '#ff6600': ''}} className="color-dark">{this.getPoints(item.objectID) || item.points}</span>
          </p>
          <p>
          <span
            style={{
              borderBottomColor: this.state.upvotedItems !== undefined && this.checkElement(item.objectID) ? "#ff6600" : "rgb(202, 202, 201)",
            }}
            onClick={() => this.upvote(item)}
            className="hn-upvote-btn">
          </span>
          <a className="color-dark" href={item.url}>{item.title}<span>({this.getDomain(item.url)})</span></a>
          </p>
          <p>
          <span className="color-light">by</span>
          <span className="color-dark">{item._highlightResult.author.value}</span>
          {moment(Date.now()).diff(moment(item.created_at), 'days')}{' '}
          days ago
          <span
                className="hn-hide-btn color-dark"
                onClick={() => this.hideItems(item)}
              >
                [ hide ]
          </span>
          </p>
        </li>
      );
    });
  }

  render() {
    return (
      <main>
        <ul>{this.renderNews()}</ul>
        <button className="hn-pagination" onClick={this.handlePaginationPrev}>Prev</button>
        <button className="hn-pagination" onClick={this.handlePaginationNext}>Next</button>
        <span className="color-light">page {this.state.page} / {this.props.pages}</span>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.news,
    pages: state.news.nbPages
  };
}

function loadData(store) {
  return store.dispatch(fetchNews());
}

export { loadData };

export default connect(mapStateToProps, { fetchNews })(NewsList);
