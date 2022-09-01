import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchComments } from '../redux'

const  Comments = ({fetchComments}) => {
	useEffect(()=> {
		fetchComments()
	},[])
	
	return (
		<div className="items">
			
		</div>
	)
}

const mapStateToProps = ({comments}) => {
	return {
		comments : comments.items
	}
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		addSubscriber: ()=>dispatch(addSubscriber())
// 	}
// }

const mapDispatchToProps = {
	fetchComments
}

export default Comments(mapStateToProps, mapDispatchToProps)(Comments)