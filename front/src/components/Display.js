import { connect } from 'react-redux'

const Display = ({count, views}) => {
	return (
		<div>
			<p>구독자 수: {count}</p>
			<p>조회수 : {views}</p>
		</div>
	)
}

const mapStateToProps = ({subscribers, views}) => {
	return {
		count : subscribers.count,
		views: views.views
	}
}

export default connect(mapStateToProps)(Display)