(function($) {
	$.fn.positionTracking = function(params) {
		params = $.extend( {nRows: 3, nCols: 3,debug:false}, params);
		var c = this;
		 this.each(function() {
			$(this).click(function(e){
				var pX 	= (e.pageX)-parseFloat($(c).css("margin-left").replace("px",""));
				var pY 	= (e.pageY)-parseFloat($(c).css("margin-top").replace("px",""));
				var h		=	$(c).height();
				var w	=	$(c).width();
				var nR = parseInt(pY/(h/params.nRows))+1;
				var nC =  parseInt(pX/(w/params.nCols))+1;
				var type="";
				switch(e.target.nodeName){
					case "A"		: 	type = "Link : "+$(this).attr("href");
												break;		
					case "IMG": 	if($(e.target).parent("a").attr("href")==undefined){type= "No Link or JS Popup" }else{	type="Image Link : "+$(e.target).parent("a").attr("href") };
												break;		
					default		:	type = "No Link";
												break;
				}
				if(params.debug){
 					e.preventDefault();
					console.log("x:"+pX+" y:"+pY+" max:("+w+","+h+") p:("+nC+","+nR+") "+e.target.nodeName+" type:"+type);	
				}
				_gaq.push(['_trackEvent', 'Click_Position_Tracking', 'Block '+($(this).attr("id")==""?($(this).attr("class")==""?e.target.nodeName:$(this).attr("class")):$(this).attr("id"))+' ('+nC+','+nR+')', type]);
			});
		 });
		return this;
	};
})(jQuery);
