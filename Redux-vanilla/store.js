const redux = require('redux')
const createStore = redux.createStore;


// actions
// action-type
const ADD_SUBSCRIBER = "ADD_SUBSCRIBER"  // type이 ADD_SUBSCRIBER 가진 object를 반환해주는 action 
const addSubscriber = () => {
	return {
		type: ADD_SUBSCRIBER
	}
}


// reducers
const initalState = {
	subscribers: 365
}
const reducer = (state=initalState, action) => {
	switch(action.type) {
		case ADD_SUBSCRIBER:
			return {
				...state,
				subscribers: state.subscribers + 1
			}
		default : return state;	
	}
}

// store
const store = createStore(reducer)



// subscribe -> view -> dispatch

console.log(store)