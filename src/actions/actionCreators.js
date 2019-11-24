
import axios from 'axios'

//for the purpose of this test, I put the api-key here
//in real production, this should be in the .env variable
const apiKey = 'G5K6qtfjqkC6D0IbFChy68ruIabQPqVd'
const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'

export const fetchArticles = (searchQuery, callback)=>{
	return async dispatch => {
		try {

			//make call to nyt apis
			const initFetch = await axios.get(`${baseUrl}?q=${searchQuery}&api-key=${apiKey}`);
			await callback()

			dispatch({
				type: 'FETCH_ARTICLE',
				payload: initFetch.data.response.docs
			})

		}catch(err){
			console.log(err)
		}
	}
}

export const setQuery = query => {
	return dispatch => {
		dispatch({
			type: 'SET_QUERY',
			payload: query
		})
	}
}