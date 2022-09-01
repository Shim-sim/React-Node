import React, {useState} from 'react'
import { connect } from 'react-redux'
import { addView } from '../redux'

const  Views = ({views, addView}) => {
	
	const [number, setNumber] = useState(1)
	
	const onChange = e => {
		setNumber(e.target.value)
	}
	
	return (
		<div className="items">
			<h2>조회수: {views}</h2>
			<input type="text" value={number} onChange={onChange}/>
			<button onClick={()=> addView(number)}>구독하기</button>
		</div>
	)
}

const mapStateToProps = ({views}) => {
	return {
		views : views.views
	}
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		addSubscriber: ()=>dispatch(addSubscriber())
// 	}
// }

const mapDispatchToProps = {
	addView: (number)=> addView(number)
}

export default connect(mapStateToProps, mapDispatchToProps)(Views)