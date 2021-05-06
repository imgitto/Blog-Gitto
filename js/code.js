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
		let fiverr_html = `<iframe src="https://tools.fiverr.com/?searchbox-iframe=1&amp;affid=237048&amp;widget-width=300&amp;widget-style=2&amp;widget-commission=fiverrhybrid" border="0" scrolling="no" height="281px" width="100%" style="border: 0px; overflow: hidden; width: 559px; height: 281px; box-shadow: rgba(17, 17, 17, 0.12) 0px 16px 32px; max-width: 300px;" class="fasb-iframe-searchbox-widget"  data-origwidth="100%" data-origheight="253px" max-width="300" widget-width="300" widget-style="2"></iframe>`;
		let fiverr_ad = document.createElement("div");
		fiverr_ad.classList.add("ad");
		fiverr_ad.innerHTML = fiverr_html;
		document.querySelector(".grid .other").appendChild(fiverr_ad);
	})();
	
})();
