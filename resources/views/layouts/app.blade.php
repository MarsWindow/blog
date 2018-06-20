<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="{{ app()->getLocale() }}"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title','Leo-Blog 博学 慎思 明辨 笃行')</title>
    <link rel="stylesheet" href="/css/vendor/bootstrap.min.css">
    <link rel="stylesheet" href="/css/flat-ui.css">
    <link rel="stylesheet" href="/css/font/font-awesome.min.css">
    <link rel="stylesheet" href="/assets/owl-carousel/owl.carousel.css">
    <link rel="stylesheet" href="/assets/owl-carousel/owl.theme.css">
    <link rel="stylesheet" href="/assets/owl-carousel/custom.css">
    <link rel="stylesheet" href="/css/validator/bootstrapValidator.min.css"/>
    <link rel="stylesheet" href="/css/style.css">
    <script src="/js/vendor/jquery-2.0.3.min.js"></script>
    <script src="/js/bootstrap/bootstrap.min.js"></script>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @yield('styles')
</head>

<body>
    <div id="app" class="{{ route_class() }}-page">
        <div class="container">
            @include('layouts._header')
                @include('layouts._message')
                @yield('content')
        </div>
        @include('layouts._footer')
    </div>
    <!-- Scripts -->
    <!-- <script src="{{ asset('js/app.js') }}"></script> -->
    @yield('scripts')
    <script>
    $(function(){
        $('[data-toggle="weixin"]').tooltip({
            title:'<img src="/images/contact/weixin.jpg" title="微信扫描二维码加我为好友并交谈" style="width:150px;hight:150px;">',
            html:true
        });
        $('[data-toggle="zhifubao"]').tooltip({
            title:'<img src="http://static.wangbaiyuan.cn/wp-content/uploads/image/weixin.png" title="微信扫描二维码加我为好友并交谈" style="width:100px;hight:100px;">',
            html:true
        });
        //当滚动条的位置处于距顶部200像素以下时，跳转链接出现，否则消失
        $(window).scroll(function(){
            if($(window).scrollTop()>200){
                $("#back-to-top").fadeIn(1500);
            }else{
                $("#back-to-top").fadeOut(1500);
            }
        });

        //点击跳转链接，回到顶部
        $("#back-to-top").click(function(){
            $('html,body').animate({'scrollTop':0},100);
            return false;
        });
    });
    </script>
</body>
</html>