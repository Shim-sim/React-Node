const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10  //salt가 몇 글자인지 설정


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
 }
	
})


const User = mongoose.model('User', userSchema)

module.exports = { User }