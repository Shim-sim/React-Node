const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')
const config = require('./config/key')
const { auth } = require('./middleware/auth')

// application.x-www-form-urlencoded client에서  오는 정보를 분석해줌
app.use(bodyParser.urlencoded({extended: true}));
// application/json json타입으로 된것을 분석해서 가져옴
app.use(bodyParser.json());
app.use(cookieParser())

mongoose.connect(config.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('몽고커넥트됨'))

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/api/users/register', (req, res) => {
	
	// 회원 가입 할때 필요한 정보들을 client에서 가져오면(req)
	// 그것들을 데이터 베이스에 넣어준다.
	
	const user =  new User(req.body) //클라에서 온 정보가 담겨있음
	
	// 정보들이 user모델에 저장됨
	user.save((err, userInfo) => {
		if(err) return res.json({ success: false, err}) //err있을 시 client에 전달해줌
		return res.status(200).json({ success: true })
	
	}) 	
})

app.post('/api/users/login', (req, res) => {
	
	//요청 된 이메일을 데이터베이스에서 있는지 찾는다.
	User.findOne( {email: req.body.email}, (err, user)=> {
		if(!user) 
			return res.json({
				loginSuccess: false,
				message: "제공된 이메일에 해당하는 유저가 없습니다."
			})
		
		//요청 된 이메일이 데이터 베이스에 있다면 비밀번호도 확인
		
		user.comparePassword(req.body.password, (err, isMatch) => {
			if(!isMatch) 
			return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
			
	
			//비밀번호도 맞다면 토큰을 생성하기.
			
			user.generateToken((err, user) => {
				if(err) return res.status(400).send(err)

				// 토큰을 저장한다. 어디에? 쿠키, localstorage
				res.cookie("x_auth", user.token) 
			})
		})
	})
})	
		

// 여기서는 auth라는 middleware를 받는다
// 미들웨어는 엔드포인트에서 req를 받은 후 콜백 전에 중간에서 무언가를 한다.
// auth에서 성공을 하면 여기로 온다. 만약 실패를 하면 auth까지 도달하지 못함
app.get('/api/users/auth', auth ,(req, res) => {
	
	//여기 까지 미들웨어를 통과해 왔다는 얘기는 auth가 true라는 말.
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		eamil: req.user.name,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image
	})
})

// 여기에서 auth는 로그인 된 상태의 auth를 가지고 있음
app.get('/api/users/logout', auth ,(req, res) => {
	
	User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user)=> {
		if(err) return res.json({success: false, err})
		return res.status(200).send({success: true})
	})
}) 






app.listen(port, () => {
  console.log(`Example app listening on port ${port} 추가로 연결됨`)
})




