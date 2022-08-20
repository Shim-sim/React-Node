import React, {useEffect} from 'react'
import axios from 'axios'

function LandingPage () {
	
	useEffect(()=> {
		axios.get('https://nodeshim.run.goorm.io/api/hello')
		.then(response => {
			console.log(response)
		})
	}, [])
	return (
	<div>
	첫 메인 페이지
			
	</div>
	)
}

export default LandingPage