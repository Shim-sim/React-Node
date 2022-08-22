import React, {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LandingPage () {
	const navigate = useNavigate()
	
	const onClickHandler = () => {
		axios.get('https://nodeshim.run.goorm.io/api/users/logout')
		.then(response => {
			console.log(response.data)
			if(response.data.success) {
				navigate('/login')
			} else {
				alert('로그아웃 하는데 실패했습니다.')
			}
		})
	}
	
	
	return (
		<div style={{
				display: 'flex', justifyContent: 'center', alignItems: 'center',
					width: '100%', height: '100vh'
			}}>
		<h2>랜딩페이지</h2>

			
			
			<button onClick={onClickHandler}>
				로그아웃
			</button>
		</div>
	)
}

export default LandingPage