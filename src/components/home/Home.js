import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchArticles, setQuery} from '../../actions/actionCreators'

import "./home.scss";

class Home extends React.Component {
  state = {
  	loading: false,
  	searchQuery: ''
  };

  componentDidMount(){
  }

  handleChange = e => {
  	this.setState({
  		searchQuery: e.target.value
  	})
  }

  handleSubmit = (e)=>{
  	e.preventDefault();

  	if(!this.state.searchQuery){
  		return
  	}

  	this.setState({
  		loading: true
  	});
  		

  	this.props.fetchArticles(this.state.searchQuery, ()=>{
  		this.props.setQuery(this.state.searchQuery)
  		this.setState({
  			loading: false,
  			searchQuery: '',
  		});
  	})
  }

  render() {
  	//console.log(this.props)
    return (
      <div className="home">

        <form onSubmit={this.handleSubmit}>
        	<input type="text" placeholder="Search" value={this.state.searchQuery} onChange={this.handleChange}/>
        	{this.props.query && <p>Showing Result for <span>{this.props.query}</span></p>}
        </form>

        {this.state.loading ? (
        	<div className="loading-wrapper">
        		<img src="https://cdn.dribbble.com/users/487964/screenshots/1464859/loading.gif" alt="img"/>
        		<p className="loading-placeholder">Hold tight, we're searching your news...</p>
        	</div>
        	
        ):(
	 		<div className="search-result">
	 			{this.props.articles.length > 0 ? (
	 				<div className="result-grid">
	 					{this.props.articles.map((article, index) => {
	 						return(
	 							<Link className="article-link" key={article.uri} to={`/${this.props.query}&c${index}`}>
	 								{article.multimedia.length > 0 ? (
	 									<img src={'https://nytimes.com/'+article.multimedia[0].url} alt="img"/>
	 								): (
	 									<img src="https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg" alt="img"/>
	 								)}
	 								
	 								<p>{article.headline.main}</p>	
	 							</Link>
	 						)
	 					})}
	 				</div>
	 			): (
					<p>Type in the search box to find the news you want</p>
	 			)}
	        </div>
        )}
       
      </div>
    );
  }
}

const mapStateToProps = state =>{
	return {
		articles: state.articles,
		query: state.query
	}
}

export default connect(mapStateToProps, {fetchArticles, setQuery})(Home);
