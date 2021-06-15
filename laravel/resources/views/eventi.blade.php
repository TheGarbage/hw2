@extends('layouts.layout')

@section('style')
        <link rel="stylesheet" href='{{ url("css/eventi.css") }}' >
@endsection

@section('script')
    <script src='{{ url("js/eventi.js") }}' defer></script>
@endsection

@section('ludoteca', "Ludoteca")

@section('sovraDescrzione')
        <ul id="titolo">
            <li>Eventi</li>
        </ul>
@endsection

@section('descrizione', "Ogni giorno lanceremo senza preavviso eventi temporanei, delle durata di qualche ora, per permettere i giocatori che riusciranno a parteciparvi di guadagnare più punti.
                         Gli eventi sono legati ognuno ad un gioco specifico e sono caratterizzati da un modificatore di punti e di difficoltà. Il primo ti permette di prendere più punti senza 
                         grossi cambiamenti al gameplay. Il secondo, in genere, ti da più punti bonus ancora ma rendendo il gioco nettamente più complicato. Qui sotto sono elencati gli eventi attivi
                         attualmente. La pagina si aggiorna in automatico!"
)

@section('contenuto')
    <main></main>
@endsection