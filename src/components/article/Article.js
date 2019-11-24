import React from 'react';
import {connect} from 'react-redux'

import {fetchArticles, setQuery} from '../../actions/actionCreators'
import './article.scss'

class Article extends React.Component {
	state = {
		idx: null
	}
	componentDidMount(){
		const mainParams = this.props.match.params.article_url.split('&c');
		this.props.fetchArticles(mainParams[0], ()=>{
			this.props.setQuery(mainParams[0]);
			this.setState({
				idx: mainParams[1]
			})
		})
	}

	render() {
		const {articles} = this.props
		const i = this.state.idx
		return (
			<div className="single-article">
				
				{this.state.idx && articles.length > 0 ? (
					<div className="single-container">
						{articles[i].multimedia.length > 0 ? (
							<img src={'https://nytimes.com/'+articles[i].multimedia[0].url} alt="img"/>
						): (
							<img src="https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg" alt="img"/>
						)}
						<h3>{articles[i].headline.main}</h3>
						<p className="date">{new Date(articles[i].pub_date).toLocaleString()}</p>
						<p className="lead-paragraph">{articles[i].lead_paragraph}</p>
						<p className="lead-paragraph">{articles[i].abstract}</p>
						<a className="lead-paragraph link-out" href={articles[i].web_url} target="_blank" rel="noopener noreferrer">Read full article at nytimes.com</a>
					</div>
				):(
					<p>Loading...</p>
				)}
				
				
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		articles: state.articles
	}
}

export default connect(mapStateToProps, {fetchArticles, setQuery})(Article)