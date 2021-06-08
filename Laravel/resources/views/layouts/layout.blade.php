<html>
    <head>
        <meta charset="utf-8">
        <title>{{ Route::currentRouteName() }}</title>
        <link rel="stylesheet" href="css/principale.css">
        @yield('style')
        <script src='{{ url("js/menuMobile.js") }}' defer></script>
        @yield('script')
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital@1&display=swap" rel="stylesheet">
    </head>
    <body>   
        @yield('body-overlay')
        <header id="header-sito" @yield('sito-principale')>
            <section id="menu-pochi-pixel">
                <div id="nav-conteiner" class="hidden"></div>
                <div id="bottone">
                    <div class="mini-menu"></div>
                    <div class="mini-menu"></div>
                    <div class="mini-menu"></div>
                </div>
            </section>
            <h1>@yield('ludoteca')</h1>
            <section id="menu">
                <a id="login" @if(isset($nome)) href = "{{ url('logout') }}" @else href = "{{ url('login/'.Route::currentRouteName()) }}" @endif>
                    @if(isset($nome))Ciao, {{ $nome }}! @else Login @endif
                </a></br>
                <nav>   
                <a @if(Request::routeIs('home')) id="paginaAttuale" @else href="{{ url('home') }}" @endif>Home</a>
                <a @if(Request::routeIs('eventi')) id="paginaAttuale" @else href="{{ url('eventi') }}" @endif>Eventi</a>
                <a @if(Request::routeIs('classifica')) id="paginaAttuale" @else href="{{ url('classifica') }}" @endif>Classifica</a>
                <a @if(Request::routeIs('contatti')) id="paginaAttuale" @else href="{{ url('contatti') }}" @endif>Contatti</a>
                </nav>
            </section>
            <div class="overlay"></div>
        </header>
        @yield('sovraDescrzione')
        <section id="descrizione" class="sito-principale">
            <p> @yield('descrizione') </p>
            @yield('scopriDiPiu')
        </section>
        @yield('contenuto')
        <div id="distanziatore" @yield('sito-principale')></div>
        <div id="footerConteiner">
            <footer @yield('sito-principale')> 
                <p>Davide bucchieri o46002072</p> <div class="overlay"></div>
            </footer>
        </div>
    </body>
</html>