(function(){
	let posts = [];
	fetch("../../js/posts.json").then(function(response){
		return response.text();
	}).then(function(p){
		
		posts = JSON.parse(JSON.parse(p));

		console.log(posts, posts.length);

		// posts = posts.sort(function(a,b) {
		// 	return Math.random() > 0.5 ? 1: -1;
		// });

		console.log(posts, posts.length);

		let olderPostHTML = posts.reverse().map(function(post){
			return `
				<a class="post" href="posts/${post.dir}">
				  <div class="thumbnail">
				    <img src="../../posts/${post.dir}/preview.${post.preview || 'png'}" alt="${post.title}" loading="lazy">
				  </div>
				  <div class="title">
				    ${post.title}	
				  </div>
				  <div class="tags">
				    ${
		        		post.tags.map(function(tag){
		        			return `<span>${tag}</span>`;
		        		}).join("")
			        	}
				  </div>
				</a>			
			`;
		}).join("");

		document.querySelector(".grid").innerHTML = olderPostHTML;


	}).catch(function(error){

	});
})();