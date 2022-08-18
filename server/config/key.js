if(process.env.NODE_ENV === "production") {
	module.exports = require('./prod')
} else {
	module.exports = require('./dev')
}
	 
	 
	 
// 환경변수를 설정해주는 중이다. 
// process.env.NODE_ENV === 이 부분이 모두 환경이 무엇이냐? 라는 걸 뜻한다.
// "production"  === 배포
// "development" === local