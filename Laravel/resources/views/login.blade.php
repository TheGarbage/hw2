<html>
    <head>
        <meta charset="utf-8">
        <title>Ludoteca_Login</title>
        <link rel="stylesheet" href='{{ url("css/principale.css") }}'> 
        <link rel="stylesheet" href='{{ url("css/login.css") }}'>
        <script src='{{ url("js/login.js") }}' defer></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet"> 
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap" rel="stylesheet"> 
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital@1&display=swap" rel="stylesheet"> 
    </head>
    <body>  
        <main>
            <form name="login" method="post"> 
                <h2>Bentornato</h2>
                <input type='hidden' name='_token' value='{{ csrf_token() }}'>
                <label @if(isset($old_username)) class="erroreL" @endif>
                    Username: <input type="text" name="userName" class='barraInput' data-max="20" value='{{ $old_username }}'>
                </label>
                <label @if(isset($old_username)) class="erroreL" @endif>
                    Password: <input type="password" name="passWord" class='barraInput'>
                </label>
                <label>&nbsp<input type='submit' class="submit"></label>
                <p class="pointer">Se non hai un account registrati!</p>
            </form>
        </main>
        <p class='erroreL'>@if(isset($old_username)) Credenziali non valide @endif</p>
    </body>
</html>