const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10  //salt가 몇 글자인지 설정
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		trime: true,
		unique: true
	},
	password: {
		type: String,
		minlength: 5
	},
	lastname: {
		type: String,
		maxlength: 50
	},
	role: {
		type: Number,
		default: 0
	},
	image: String,
	token: {
		type: String
	},
	tokenExp: {
		type: Number
	}
	
})

 
// 스키마의 method pre는 특정 동작 이전에 수행하는 것이다.
// 지금 코드는 'save' 이전에 밑의 function을 수행한다는 의미이다.
// 이 pre의 위치는 router의 save 전에 위치하게됨 next()로 이동
userSchema.pre('save', function ( next ) {
	var user = this;
	
	if(user.isModified('password')) {
		// 비밀번호를 암호화 시킨다.
			bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) return next(err)
		
		bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err)
			user.password = hash	
			next()
    })
	})	
 } else {
	 next()
 }
	
})

userSchema.methods.comparePassword = function(plainPassword, callback) {
	
	//plainPassword 1234567 암호화된 비밀번호가 같은지 체크하기 위해서 plain을 암호화한다.
	bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
		if(err) return callback(err)
			callback(null, isMatch)
	})
	
}

userSchema.methods.generateToken = function(callback) {
	var user = this;
	
	// jwt 활용해서 토큰 생성하기 userid와 문자열로 토큰을 생성한다.
	var token = jwt.sign(user._id.toHexString(), 'secretToken')
	user.token = token
	user.save(function(err, user) {
		if(err) return callback(err)
		callback(null, user)
	})
	
}

userSchema.statics.findByToken = function(token, callback) {
	var user = this;
	
	//토큰을 decode 한다.
	jwt.verify(token, 'secretToken', function(err, decoded){
		//유저 아이디를 이용해서 유저를 찾은다음에
		//클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
		
		// 인증 된 유저만 user에 담긴다.
		user.findOne({"_id": decoded, "token": token} , function(err, user){
			if(err) return callback(err)
			callback(null, user)
		})
		
	})
}


const User = mongoose.model('User', userSchema)

module.exports = { User }