/*!
 * mobile wap for jquery
 * by zengfq
 */
if(typeof(_jwap_root) == 'undefined'){
	var js = document.scripts;
	for(var i=js.length;i>0;i--){
	 if(js[i-1].src.indexOf("jwap.js")>-1){
		 _jwap_root=js[i-1].src.substring(0,js[i-1].src.lastIndexOf("/")+1);
		 break;
	 }
	}
}

document.write('<link href="'+_jwap_root+'style.css?v=0.6" type="text/css" rel="stylesheet" />');

(function($) {
	var JWapAjax = {
		json : function(url,data,callback){
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				dataType: "json",
				success: callback
			});
		},
		done : function(url, data, msg, callback){
			JWapAjax.json(url, data, function(response){
				if (response.success == 1) {
					JWap.showMessage(msg, function(){
						if(typeof(callback) != 'undefined' && callback){
							callback(response);
						}
					});
				}
				else {
					JWap.showMessage(response.msg);
				}
			});
		}
	};	
	
	var JWap = {
		selector : '.jwap_selector',
		//隐藏页面
		hidePage : function(obj){
			$(obj).hide();
		},
		//回退
		backPage : function(reflash){
			window.history.go(-1);
		},
		//刷新页面
		reflashPage : function(){
			window.location.reload();
		},
		showMessage : function(msg,callback,settings){
			JWapMessage.zindex++;
			$('#_message').css('z-index',JWapMessage.zindex);
			
			var defaults = {
				'title':'确认',
				'noboder':false,
				'btext':'确认',
				'maxw':600
			};
			var opts = $.extend({}, defaults, settings);
			
			$('#_message .jwapTitle .jwapName').html(opts.title);
			
			if(!opts.noboder) $('#_message .jwapInner .jwapText').removeClass('jwapNoboder'); 
			else $('#_message .jwapInner .jwapText').addClass('jwapNoboder');
			
			$('#_message .jwapOperateDone .confirm').html(opts.btext);
			$('#_message .jwapInner .jwapListBox').css('max-width',opts.maxw+'px');
			
			$('#_message .jwapText').html(msg);
			$('#_message .confirm').unbind( "click");
			$('#_message .confirm').bind('click',function(){
				if(typeof(callback) != 'undefined' && callback){
					var rcode = callback();
					if(typeof(rcode) != 'undefined' && !rcode) return;
				}
				JWap.hidePage('#_message');	
				JWapMessage.zindex--;
			});
			JWapMessage.resizeMessage('#_message');
			JWapMessage.displayMessage('#_message');
		},
		hideMessage : function(){
			$('#_message').hide();
		},
		showConfirm : function(msg,callback,settings){
			JWapMessage.zindex++;
			$('#_confirm').css('z-index',JWapMessage.zindex);
			
			var defaults = {
				'title':'确认',
				'noboder':false,
				'btext':'确认',
				'maxw':600
			};
			var opts = $.extend({}, defaults, settings);
			
			$('#_confirm .jwapTitle .jwapName').html(opts.title);
			
			if(!opts.noboder) $('#_confirm .jwapInner .jwapText').removeClass('jwapNoboder'); 
			else $('#_confirm .jwapInner .jwapText').addClass('jwapNoboder');

			$('#_confirm .jwapOperate .confirm').html(opts.btext);
			$('#_confirm .jwapInner .jwapListBox').css('max-width',opts.maxw+'px');
			
			$('#_confirm .jwapText').html(msg);
			$('#_confirm .confirm').unbind( "click");
			$('#_confirm .confirm').bind('click',function(){
				if(typeof(callback) != 'undefined' && callback){
					var rcode = callback();
					if(typeof(rcode) != 'undefined' && !rcode) return;
				}
				JWap.hidePage('#_confirm');
				JWapMessage.zindex--;
			});
			JWapMessage.resizeMessage('#_confirm');
			JWapMessage.displayMessage('#_confirm');
		},
		jwap_initance : function(selector,container){
			if(typeof(container) != 'undefined' && container != ''){
				JWap.container = container;
			}
			
			if(typeof(selector) != 'undefined' && selector != ''){
				JWap.selector = selector;
			
				$(document).undelegate(JWap.selector,'click');	
				$(JWap.selector).bind('click',function(event){
					url = $(this).attr('href');
					if(typeof(url) == 'undefined' || url == '') url = $(this).attr('url');
						
					if(typeof(url) == 'undefined' || url == ''){
						event.preventDefault();
						return;
					}
					
					window.location.href = url;						
					event.preventDefault();
				});
			}
		}
	};
	
	var JWapDailog = {
		done : function(url,data,callback,settings){
			JWap_ajaxJson(url,data,function(response){
				if (response.success == 1) {
					var opts = $.extend({},{'noboder':true},settings);
					JWap_showConfirm(response.msg,callback,opts);
				}
				else {
					JWap_showMessage(response.msg);
				}
			});
		},
		done_str : function(str,callback,settings){
			var opts = $.extend({},{'noboder':true},settings);
			JWap_showConfirm(str,callback,opts);
		}
	};
	
	var JWapMessage = {
		zindex : 900,
		resizeMessage : function(obj){
			var jwapInner = $(obj).find('.jwapInner');
			if(jwapInner.height() > 0){
				//内容页滚动
				var textCy = $(window).height()-100;
				if(jwapInner.find('.jwapText').height() > textCy){
					jwapInner.find('.jwapText').css('max-height', textCy+'px');
					jwapInner.find('.jwapText').css('overflow-y','scroll');
				}else{
					jwapInner.find('.jwapText').css('overflow-y','auto');
				}
				
				var wTop = $(window).scrollTop();
				
				//偏移
				var bCy = $(obj).find('.jwapInner').height()/2;
				var wCy = $(window).height()/2 -bCy;
				if(wCy <= 0) wCy = 0;
				jwapInner.css('margin-top',wCy+'px');
				
				//定位
				cy = $(window).height();
				$(obj).css('height',cy+'px');
			}
			else{
				setTimeout(function(){JWapMessage.resizeMessage(obj);},100);
			}
		},
		displayMessage : function(obj){
			var wTop = Math.max.call(window.scrollTop,document.body.scrollTop,document.documentElement.scrollTop);
			$(obj).show();
			$('body,html').animate({scrollTop:wTop},100);
		},
		showMessage : function(msg,callback,settings){
			if($('#_u_message').length == 0) JWapMessage.createMessage();
			
			JWapMessage.zindex++;
			$('#_u_message').css('z-index',JWapMessage.zindex);
			
			var defaults = {
				'title':'消息',
				'noboder':false,
				'btext':'确认',
				'maxw':600
			};
			var opts = $.extend({}, defaults, settings);
			
			$('#_u_message .jwapTitle .jwapName').html(opts.title);
			
			if(!opts.noboder) $('#_u_message .jwapInner .jwapText').removeClass('jwapNoboder'); 
			else $('#_u_message .jwapInner .jwapText').addClass('jwapNoboder');

			$('#_u_message .jwapOperateDone .confirm').html(opts.btext);
			$('#_u_message .jwapInner .jwapListBox').css('max-width',opts.maxw+'px');
			
			$('#_u_message .jwapText').html(msg);
			$('#_u_message .confirm').unbind( "click");
			$('#_u_message .confirm').bind('click',function(){
				if(typeof(callback) != 'undefined' && callback){
					var rcode = callback();
					if(typeof(rcode) != 'undefined' && !rcode) return;
				}
				JWap.hidePage('#_u_message');
				JWapMessage.zindex--;
			});
			JWapMessage.resizeMessage('#_u_message');
			JWapMessage.displayMessage('#_u_message');
		},
		hideMessage : function(){
			$('#_u_message').hide();
			JWapMessage.zindex--;
		},
		createMessage : function(){
			var _wap_xml = 
				'<div id="_u_message" class="jwapMessage" style="z-index:1001">' +
					'<div class="jwapInner">' +
						'<div class="jwapListBox jwapRadius3">' +
							'<div class="jwapTitle">' +
								'<div class="jwapClose" onclick="JWap_hidePage(\'#_u_message\')"></div>' + 
								'<div class="jwapName">消息</div>' +
							'</div>' +
							'<div class="jwapText">正在请求数据...</div>' +
							'<div class="jwapOperateDone">' +
								'<ul>' +
									'<li class="confirm jwapRadius3">确定</li>' +
								'</ul>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
			
			var div = document.createElement("div");
			div.innerHTML = _wap_xml;
			document.body.insertBefore(div,document.body.childNodes[0]);
			
			var cy = $(window).height()/2 + $(window).scrollTop()-75;
			$('#_u_message').css('height',$(window).height());
			$('#_u_message').find('.jwapInner').css('margin-top', cy+'px');
		}
	};
	//var jwap_initance = function(){
	$(function(){
		var _wap_xml = 
			'<div id="_message" class="jwapMessage">' +
				'<div class="jwapInner">' +
					'<div class="jwapListBox jwapRadius3">' +
						'<div class="jwapTitle">' +
							'<div class="jwapClose" onclick="JWap_hidePage(\'#_message\')"></div>' + 
							'<div class="jwapName">消息</div>' +
						'</div>' +
						'<div class="jwapText">正在请求数据...</div>' +
						'<div class="jwapOperateDone">' +
							'<ul>' +
								'<li class="confirm jwapRadius3">确定</li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div id="_confirm" class="jwapMessage">' +
				'<div class="jwapInner">' +
					'<div class="jwapListBox jwapRadius3">' +
						'<div class="jwapTitle">' +
							'<div class="jwapClose" onclick="JWap_hidePage(\'#_confirm\')"></div>' + 
							'<div class="jwapName">确定</div>' +
						'</div>' +
						'<div class="jwapText">数据请求失败，请检查网络</div>' +
						'<div class="jwapOperate">' +
							'<ul>' +
								'<li class="confirm jwapRadius3" >确定</li>' +
								'<li class="cancel jwapRadius3" onclick="JWap_hidePage(\'#_confirm\')">取消</li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		
		var div = document.createElement("div");
		div.innerHTML = _wap_xml;
		document.body.insertBefore(div,document.body.childNodes[0]);
		
		//$('input, textarea').placeholder();
		$('.jwapMessage').each(function(){
			JWapMessage.resizeMessage($(this));
		});
		
		$(window).bind('resize',function(){
			$('.jwapMessage').each(function(){
				JWapMessage.resizeMessage($(this));
			});
		});
		
		$(window).resize();
		
		JWap.jwap_initance(JWap.selector);
	});
	
	JWap_showMessage = JWap.showMessage;
	JWap_hideMessage = JWap.hideMessage;
	JWap_hidePage = JWap.hidePage;
	JWap_backPage = JWap.backPage;
	JWap_reflashPage = JWap.reflashPage;
	JWap_showConfirm = JWap.showConfirm;

	JWap_initance = JWap.jwap_initance;
	JWap_showMultiMessage = JWapMessage.showMessage;
	JWap_hideMultiMessage = JWapMessage.hideMessage;
	
	JWap_ajaxJson = JWapAjax.json;
	JWap_ajaxDone = JWapAjax.done;
	
	JWap_doneDailog = JWapDailog.done;
	JWap_doneXmlDailog = JWapDailog.done_str;
})(jQuery);
