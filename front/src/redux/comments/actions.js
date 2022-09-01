

export const fetchComments = () => {
	return (dispatch)=> {
		fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
			.then(response => response.json())
			.then(comments => console.log(comments))
			.catch(error => console.log(error))
			
	}
}