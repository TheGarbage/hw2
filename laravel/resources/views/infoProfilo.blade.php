@extends('layouts.layout')

@section('style')
    <link rel="stylesheet" href='{{ url("css/infoProfilo.css") }}'>
@endsection

@section('script')
        <script src='{{ url("js/infoProfilo.js") }}' defer></script>
@endsection

@section('ludoteca', "Profilo")

@section('descrizione', "Qui puoi vedere i dettagli del tuo profilo e lo storico transazioni!")

@section('contenuto')
    <ul id="titolo">
        <li class='infoGenerali'>Info generali
            <main>
                <section>
                    <form name='nome'>
                        <label>Nome e cognome: 
                            <div data-name='nome' data-max='50' class='barraInput'>
                                <p>{{ $dati['nome'] }}</p><img class='pointer' src='/laravel/public/img/modificabile.jpg'>
                            </div>
                        </label>
                    </form>
                    <label>Username: 
                        <div data-name='username' class='barraInput'>{{ $dati['username'] }}</div>
                    </label> 
                    <form name='anno_nascita'>
                        <label>Data nascita: 
                            <div data-name='data' class='barraInput'>
                                <p>{{ explode(' ', $dati['data_nascita'], 2)[0] }}</p><img class='pointer' src='/laravel/public/img/modificabile.jpg'>
                            </div>
                        </label>
                    </form>
                    <form name='occupazione'>
                        <label>Occupazione: 
                            <div data-name='occupazione' data-max='30' class='barraInput'>
                                <p>{{ $dati['occupazione'] }}</p><img class='pointer' src='/laravel/public/img/modificabile.jpg'>
                            </div>
                        </label>
                    </form>
                </section>
                <section>
                    <div data-name='password' class='pointer'>Cambia password</div>
                </section>
            </main>
            <p class='errore margineRidotto'></p>
        </li>
        <li>Riepilogo transazioni
            @if(!isset($dati['transazioni']))
                (0 transazioni effettuate)
            @else
                <table> 
                    <thead> 
                        <tr> 
                            <th>Orario ingresso</th> <th>Orario uscita</th> <th>Durata sessione</th> <th>Punteggio guadagnato</th> <th>Sconto ottenuto</th> <th>Costo sessione</th> 
                        </tr> 
                        </thead> 
                    <tbody>
                    @foreach($dati['transazioni'] as $item)
                        <tr> 
                            <th>{{ $item['inizio'] }}</th> <th>{{ $item['fine'] }}</th> <th>{{ $item['durata'] }}</th> <th>{{ $item['punteggio'] }}</th> <th>{{ $item['sconto'] }}</th> <th>{{ $item['spesa'] }}</th>
                        </tr>
                    @endforeach
                        <tr> 
                            <th class='nascondi'></th> <th class='nascondi'></th> <th>TOTALE:</th> <th>{{ $dati['riepilogo']['punteggio_totale'] }}</th> <th>{{ $dati['riepilogo']['sconto_medio'] }}</th> <th>{{ $dati['riepilogo']['spesa_totale'] }}</th>
                        </tr>
                    </tbody> 
                </table>
            @endif
        </li>
    </ul>
    <a href={{ url('logout') }} id="logout">Logout<a>
@endsection