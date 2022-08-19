if(process.env.NODE_ENV === "production") {
	module.exports = require('./prod')
} else {
	module.exports = require('./dev')
}
	 
	 
	 
// 환경변수를 설정해주는 중이다. 
// process.env.NODE_ENV === 이 부분이 모두 환경이 무엇이냐? 라는 걸 뜻한다.
// "production"  === 배포
// "development" === local

// 결국에는 내가 index.js에서 require 시킬 때
// local 환경에서 작업하는 나는 config/key를 가져오면 key는 dev를 export 시킬것이다.!!!
// 만약 배포 후 환경이면 prod를 가져갈 것이고!