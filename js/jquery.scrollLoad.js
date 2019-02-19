(function($){
	$.fn.scrollLoad=function(fn){
		if(!$.isFunction(fn))
		{
			return;
		}
		var nodeCache=[];
		$(this).each(function(){
			nodeCache.push($(this));
		});
		var callback=function(call){
			fn.call(call.get(0));
		}
		var loading=function(){			
			var st = $(window).scrollTop(), ch = $(window).height(),post, posb;
            $.each(nodeCache, function (i, o) {               
                if (o) {
                   	post = o.offset().top - st;
                    if (o.is(':visible') && (post >= 0 && post < ch)) {
                        callback(o);
                        nodeCache[i] = null;	
                    }
                }
            });
            return false;
		}

		loading();
        $(window).bind("scroll", loading);
	}
})(jQuery)