	try
	{
	
		var myVar=setInterval("loadPlumXwidget()",500);
	
		function loadPlumXwidget(){
			if (!window.jQuery) {
				return;
			}
			clearInterval(myVar); //clean interval
			var insertedWidgetsCount = 0;
			
			//hide widget
			jQuery.support.cors = true;
			jQuery('.related-info-area:contains("plumx")',window.parent.document).css('display','none');
			jQuery('.related-info-area:contains("Plum Print")',window.parent.document).css('display','none');
			jQuery('div[data-key="Plum Print"]',window.parent.document).css('display','none'); 
			// process as soon as main doc is loaded
			jQuery(window.parent.document).ready(function(){
				jQuery('a[id^="link"]',window.parent.document).each(function(index) {
					//get the url of the link
					// check if it's a plumx custom link
					var objPlumX=jQuery(this);
					var url=decodeURIComponent(objPlumX.attr('href'));
					var l=jQuery(this).html();
					
						if (l.indexOf("plumx")>0) {
							
							var params=url.substring(url.lastIndexOf("doi"));
							
							// parse doi or/and isbn
							var paramsObj=JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
							var doi=params.substring(0,params.indexOf("&isbn"));
							var isbn=params.substring(params.indexOf("isbn="));
							var urlPlumX="https://plu.mx/a/";

							//generate the link based on the doi/isbn
							if (doi!="doi=")
							{
								urlPlumX=urlPlumX+"?"+doi;
							}
							else
							{
								urlPlumX=urlPlumX+"?"+isbn;
							}
							insertedWidgetsCount++;
							
							// insert hover				
							objPlumX.attr("href",urlPlumX);
							objPlumX.attr("data-badge","true"); // text added
							objPlumX.attr("data-hide-when-empty","true"); // hide if no metrics exist
							objPlumX.attr("data-popup","right");
							objPlumX.attr("class","plumx-plum-print-popup");
						}
					});
					if (insertedWidgetsCount > 0) {
						// insert plumx popup js file 
						var pluJS="http://d39af2mgp1pqhg.cloudfront.net/widget-popup.js"; // no cache busting needed, caching is actually desirable here
						window.parent.document.getElementsByTagName('body')[0].appendChild(document.createElement('script')).setAttribute('src',pluJS);
					}
					//
					// change few rules on the css

					var cssPlumx='<style>\
							.PlumX-Popup { margin-top: -17px  !important; }\
							.PlumX-Popup .ppp-container > a {height: 50px !important;}\
							.plx-print {width:50px !important; height: 50px !important;}\
							.plx-wrapping-print-link {margin: 0px !important; } \
							.PlumX-Popup .ppp-pop-right {left: 60px !important; top: -38px !important;}\
							.record-icon ~ div {overflow: visible !important;}\
							</style>';
							
					jQuery('.resultList',window.parent.document).append(cssPlumx);
					
			});

		};
	}
	catch (err)
	{
		alert(err.Message);
	}