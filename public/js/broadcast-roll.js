/*
 * author Ray li
 * date: 2017-5-11
 * version: 1.0	
 * qq: 815647212
*/
function b(){	
	t = parseInt(x.css('top'));
	y.css('top','50px');	
	x.animate({top: t - 50 + 'px'},'slow');	//50为每个li的高度
	if(Math.abs(t) == h-50){ //50为每个li的高度
		y.animate({top:'0px'},'slow');
		z=x;
		x=y;
		y=z;
	}
	setTimeout(b,3000);//滚动间隔时间 现在是3秒
}
$(document).ready(function(){
	$('.broad-cast-swap').html($('.broad-cast-li').html());
	x = $('.broad-cast-li');
	y = $('.broad-cast-swap');
	h = $('.broad-cast-li li').length * 50; //50为每个li的高度
	setTimeout(b,3000);//滚动间隔时间 现在是3秒
	
})
/*(function($){
    $.fn.extend({
	    Scroll:function(opt,callback){
	    	if(!opt) var opt={};
	    	var oo;
	    	var _this=this.eq(0).find("ul:first");
	    	var lineH=_this.find("li:first").height(),//23
	    	line = opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10),
	    	speed=opt.speed?parseInt(opt.speed,10):7000, //卷动速度，数值越大，速度越慢（毫秒）
	    	timer=opt.timer?parseInt(opt.timer,10):7000; //滚动的时间间隔（毫秒）
	    	if(line==0) line=1;
	    	var upHeight = 0-line*lineH;//-总高度
		    scrollUp=function(){
			    _this.animate({
			    marginTop:upHeight // <li>的margin-top
			    },speed,function(){
				    for(i=1;i<=line;i++){
				    _this.find("li:first").appendTo(_this);
				    }
			    	_this.css({marginTop:0});
			    	}
			    );
		    };
		    var timerID = function(){
		    	oo =setInterval("scrollUp()",timer);
		    };
		   	timerID();
	    _this.hover(function(){
		    clearInterval(oo);
		    },function(){
				timerID();
		    }).mouseout(function(){
		    	$('body').css({'background-color':'#aecdef'});
		    });
	    }
    });
})(jQuery);*/