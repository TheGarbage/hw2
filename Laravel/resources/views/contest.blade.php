@extends('layouts.layout')

@section('style')
        <link rel="stylesheet" href='{{ url("css/contest.css") }}' >
@endsection

@section('script')
    @if(isset($nome) && !isset($response))
        <script src='{{ url("js/apiContest.js") }}' defer></script>
    @endIf
@endsection

@section('ludoteca', "Ludoteca")

@section('sovraDescrzione')
        <ul id="titolo">
            <li>Contest lockdown</li>
        </ul>
@endsection

@section('descrizione', "Abbiamo passato l'ultimo anno chiusi in casa. Quando potremo tornare alla nostra vita quotidiana abbiamo pensato di 
                         festeggiare le cosa con un nuovo gioco a tema scelto da voi. Indicateci il vostro gioco preferito o quello che vi ha salvato dalla
                         routine post-covid e il più selezionato vincerà il contest."
)

@section('contenuto')
    @if(isset($nome) && isset($response) && isset($errore))
        <p id='responso' class='errore'> {{ $response }} </p>
    @elseIf(isset($nome) && isset($response))
        <p id='responso'>"Grazie per aver partecipato! 
            </br> 
                Hai selezionato: {{ $response }}
            </br>
            </br>
            <a href='{{ url("contest/delete") }}'>Annulla voto</a>
        </p>
    @elseIf(isset($nome))
        <form id='contestVideogiochi'>
            <input type='text' id='barraRicerca' class='barraInput' value='Cerca i tuoi giochi:'>
            <input type='submit' id='submit' class='submit' value='cerca'>
        </form>
        <section id='giochiForm'></section>
        <p id='responso' class='hidden'>
            Grazie per aver partecipato! 
            </br>
            Hai selezionato: 
        </p>
    @else
        <p id='responso'> 
            <a href='{{ url("login/contest") }}'>Loggati per partecipare!</a>
        </p>
    @endIf
@endsection