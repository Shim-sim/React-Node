const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const combineReducers = redux.combineReducers; // 두개의 reducer을 넘기기 위한 라이브러리


// action-type
const ADD_SUBSCRIBER = "ADD_SUBSCRIBER"  // type이 ADD_SUBSCRIBER 가진 object를 반환해주는 action 
const ADD_VIEW = 'ADD_VIEW'


// actions
const addSubscriber = () => {
	return {
		type: ADD_SUBSCRIBER
	}
}

const addViews = () => {
	return {
		type: ADD_VIEW	
	}
	
}



initialState
const subscriberState = {
	subscribers: 365
}

// reducers
const subscriberReducer = (state=subscriberState, action) => {
	switch(action.type) {
		case ADD_SUBSCRIBER:
			return {
				...state,
				subscribers: state.subscribers + 1
			}
		default : return state;	
	}
}

const viewState = {
	views: 100
}

const viewReducer = (state = viewState, action) => {
	switch(action.type) {
		case ADD_VIEW:
			return {
				...state,
				views: state.views + 1
			}
		default: return state;
	}
}

const rootReducer = combineReducers({
	view: viewReducer,
	subscriber: subscriberReducer
})

// store
const store = createStore(rootReducer, applyMiddleware(logger))



// subscribe -> view -> dispatch

// store.subscribe(()=>{
// 	console.log(store.getState())
// })

// dispatch를 호출하면 리듀서에 있는 값에 변화가 일어남
store.dispatch(addViews())
store.dispatch(addSubscriber())

console.log(redux)
