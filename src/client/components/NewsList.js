import React, { Component } from "react";
import { connect } from "react-redux";
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

  renderNews() {
    return this.props.news.map((item) => {
      return (
        <li key={item.objectID}>
          <span
            style={{
              color: this.state.upvotedItems !== undefined && this.state.upvotedItems.includes(item.objectID) ? "orange" : "black",
            }}
            onClick={() => this.upvote(item)}
            className="hn-upvote-btn">
            up
          </span>
          {item.title}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        Hellooo
        <ul>{this.renderNews()}</ul>
      </div>
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
