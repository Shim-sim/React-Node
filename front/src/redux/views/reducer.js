import { ADD_VIEW } from './types'

const initialState = {
	views: 10000
}

const viewsReducer = (state=initialState, action) => {
	switch(action.type) {
		case ADD_VIEW:
			return {
				...state,
				views: state.views + action.payload
			}
		default: return state	
	}
}

export default viewsReducer