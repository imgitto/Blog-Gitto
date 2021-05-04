(function(){

	fetch("code").then(function(response){
		return response.text();
	}).then(function(codetext){
		codetext = codetext.split("\n");
		let codeBlocks = {};

		let currentCodeBlock = "";
		for(let i=0;i<codetext.length;i++){
			if(codetext[i].startsWith("==========")){
				codetext[i] = codetext[i].replace(/=/g,"");
				currentCodeBlock = codetext[i];
				codeBlocks[currentCodeBlock] = [];
				continue;
			}
			codeBlocks[currentCodeBlock].push(codetext[i]);
		}

		let codeHTML = "";

		let codeKeys = Object.keys(codeBlocks);
		for(let i=0;i<codeKeys.length;i++){
			codeHTML += `
				<div class="${codeKeys[i]}-code">
			      <div class="title">${codeKeys[i]}</div>
			      <div class="source-code">
			      	<pre class="prettyprint"><code>${safeHTML(codeBlocks[codeKeys[i]].join("\n"))}</code></pre>
			      </div>
			    </div>
			`;
		}

		document.querySelector(".grid .code").innerHTML = codeHTML;
		setTimeout(function(){
			PR.prettyPrint();
		},100);
	}).catch(function(error){

	});

	function safeHTML(code){
		return code.replace(/</g,"&lt;").replace(/>/g,"&gt;");
	}
})();