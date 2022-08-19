const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')
const config = require('./config/key')

// application.x-www-form-urlencoded client에서  오는 정보를 분석해줌
app.use(bodyParser.urlencoded({extended: true}));
// application/json json타입으로 된것을 분석해서 가져옴
app.use(bodyParser.json());
app.use(cookieParser())

mongoose.connect(config.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('몽고커넥트됨'))

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/register', (req, res) => {
	
	// 회원 가입 할때 필요한 정보들을 client에서 가져오면(req)
	// 그것들을 데이터 베이스에 넣어준다.
	
	const user =  new User(req.body) //클라에서 온 정보가 담겨있음
	
	// 정보들이 user모델에 저장됨
	user.save((err, userInfo) => {
		if(err) return res.json({ success: false, err}) //err있을 시 client에 전달해줌
		return res.status(200).json({ success: true })
	
	}) 	
})

app.post('/login', (req, res) => {
	
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
				.status(200)
				.json({loginSuccess: true, userId: user._id})
			})
		})
	})
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port} 추가로 연결됨`)
})




