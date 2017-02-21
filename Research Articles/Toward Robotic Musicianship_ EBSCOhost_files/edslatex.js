var mathTrackCall = setInterval(function() {
	if (window.jQuery) {
	clearInterval(mathTrackCall);
	CustomMathEDS();
	}
}, 10);

function CustomMathEDS() {
	if(QueryString('sdb')=='edspub') { return; }
	if (jQuery('body').data('custommath') == 1) { return; }
	else { jQuery('body').attr('data-custommath', '1'); }
	addLaTexSupport();
}

function addLaTexSupport(){
	jQuery('.related-info-area:contains("MathJaxResult")').css('display', 'none');
	jQuery('div[data-key="MathJaxDetail"]').css('display','none');
	if (document.URL.indexOf("results?")>-1 || document.URL.indexOf("/resultsadvanced?")>-1){
		jQuery('.title-link').each(function(){
			jQuery(this).html(jQuery(this).html().replace(/\$\$/g, '$'));
		});
		doMathJax();
	}
	else if(document.URL.indexOf("/detail?")>-1){
	  if(ep.clientData.currentRecord.Db == 'msn'){
			doMathJax();
	  }
	}
}

function doMathJax() {

	MathJax.Hub.Config({
		config : ["http://widgets.ebscohost.com/prod/simplekey/mathjax/mathscinet/local.js"],
		tex2jax: {
			inlineMath: [['$','$'], ['\\(','\\)']],
			balanceBraces: true,
			processRefs: true,
			processEnvironments: true
		}
	});
	MathJax.Hub.Configured();

}

function QueryString(key) {
   var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
   var r=[], m;
   while ((m=re.exec(document.location.search)) != null) r.push(m[1]);
   return r;
}
