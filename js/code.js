(function(){
	
	document.querySelector(".grid .code").innerHTML = `
		<div class="loader"></div>
	`;
	
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
		document.querySelector(".grid .code").innerHTML = `
			<p>Something went wrong. Please try again.<p>
			<button onclick="window.location.href = window.location.href">Reload Page</buton>
		`;
	});

	function safeHTML(code){
		return code.replace(/</g,"&lt;").replace(/>/g,"&gt;");
	}
	
	;(function(){
		if(innerWidth < 1050){
			return;	
		}
		let fiverr_html = `<a href="https://track.fiverr.com/visit/?bta=237048&nci=7020" Target="_Top"><img border="0" src="https://fiverr.ck-cdn.com/tn/serve/?cid=11973820"  width="300" height="300"></a>`;
		let fiverr_ad = document.createElement("div");
		fiverr_ad.classList.add("ad");
		fiverr_ad.innerHTML = fiverr_html;
		document.querySelector(".grid .other").insertBefore(fiverr_ad, document.querySelector(".grid .other .ad"));
	})();
	
})();
