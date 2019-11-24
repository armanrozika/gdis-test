const initstate = {
	articles: [],
	query: ''
}

const rootReducer = (state=initstate, action) => {
	if(action.type === 'FETCH_ARTICLE'){
		return {
			...state,
			articles: action.payload
		}
	}
	if(action.type === 'SET_QUERY'){
		return {
			...state,
			query: action.payload
		}
	}

	return state
	
}

export default rootReducer