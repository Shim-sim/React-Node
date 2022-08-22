import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth'

function LoginPage () {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [Email, setEmail] = useState('')
	const [Password, setPassword] = useState('')
	

	const onEmailHandler = (e) => {
		setEmail(e.target.value)
	}	
	
	const onPasswordHandler = (e) => {
		setPassword(e.target.value)
	}
	
	const onSubmitHandler = (e) => {
		e.preventDefault();
		
		let body = {
			email: Email,
			password: Password
        }
		
		dispatch(loginUser(body)) // dispatch의 return 값은  reducer의 loginUser에서 리턴된 객체가 됨
		.then(response => {
			if(response.payload.loginSuccess) {
				console.log(response)
				navigate('/')
			} else {
				alert('로그인에 실패했습니다.')
			}
		})
		
	}
	
	return (
		<div style={{
			display: 'flex', justifyContent: 'center', alignItems: 'center'
			, width: '100%', height: '100vh'
		}}>
			<form style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={onSubmitHandler}>
				
				<label>Email</label>
				<input type="email" value={Email} onChange={onEmailHandler} />
				
				<label>Password</label>
				<input type="password" value={Password} onChange={onPasswordHandler} />
				<br />
				
				<button type="submit">
						Login
				</button>
			</form>
		</div>
	)
}

export default Auth(LoginPage, false);