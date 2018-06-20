    <!-- Start Header -->
    <nav class="navbar navbar-inverse navbar-lg" role="navigation">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-4">
                <span class="sr-only">Toggle navigation</span>
            </button>
            <a class="navbar-brand" href="{{ url('/') }}">LeoBlog</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-collapse-4">
            <ul class="nav navbar-nav">
                <li><a href=""><i class="fa fa-home"></i>首页</a></li>
                <li><a href=""><i class="fa fa-paper-plane"></i>业界快讯</a></li>
                <li><a href=""><i class="fa fa-shield"></i>技术博文</a></li>
                <!-- <li><a href="#"><i class="fa fa-slideshare"></i>感官世界</a></li>
                <li><a href="#"><i class="fa fa-hdd-o"></i>学习阅读</a></li> -->
                <li><a href="" target="_blank"><i class="fa fa-edge"></i>网址导航</a></li>

                <!-- <li class="dropdown">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-info-circle"></i>关于 <b class="caret"></b></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="http://hao.hililei.com" target="_blank">网址导航</a></li>
                                        </ul>
                                    </li> -->
                <!-- <li><a href="/Talk"><i class="fa fa-leaf"></i>说说</a></li> -->
                <!-- <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-info-circle"></i>关于 <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">微信公众号</a></li>
                        <li><a href="#">留言</a></li>
                    </ul>
                </li> -->
            </ul>

            <!-- Right Side Of Navbar -->
            <ul class="nav navbar-nav navbar-right">
                @guest
                    <!-- Authentication Links -->
                    <li><a href="{{ route('login') }}">登录</a></li>
                    <li><a href="{{ route('register') }}">注册</a></li>
                @else
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span class="pull-left" style="margin-right:8px; margin-top:-5px;">
                                <img src="{{ Auth::user()->avatar }}" class="img-responsive img-circle" width="30px" height="30px">
                            </span>
                            {{ Auth::user()->name }} <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="{{ route('users.edit', Auth::id()) }}">
                                    编辑资料
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                             document.getElementById('logout-form').submit();">
                                    退出登录
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                        </ul>
                    </li>
                @endguest
            </ul>

        </div><!-- /.navbar-collapse -->
    </nav>
    <!-- End Header -->