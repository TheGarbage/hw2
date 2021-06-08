@extends('layouts.layout')

@section('script')
    @if(isset($nome)) 
        <script src='{{ url("js/homeLoggato.js") }}' defer></script>
    @else
        <script src='{{ url("js/home.js") }}' defer></script>
    @endif
    <script src='{{ url("js/apiCovid.js") }}' defer></script>
@endsection

@section('sito-principale', "class='sito-principale'")

@section('body-overlay')
    <div id="body-overlay" class="overlay hidden"></div>
@endsection

@section('ludoteca', "Ludoteca")

@section('sovraDescrzione')
    <section id="alertNonCreato" class="sito-principale hidden"></section> 
@endsection

@section('descrizione', "Gioca a centinaia di giochi e fai più punti possibili per avere sconti sempre più grandi. Diventa nostro cliente per essere sempre aggiornato 
                         sulle novità ed entrare nella nostra classifica ufficiale. Dicci quali sono i tuoi giochi preferiti e ti metteremo in evidenzia tutti gli eventi che li riguardano
                         cosi che non ti perderai nulla. Dimostra a tutti fino a dove può arrivare il tuo lato nerd!"
)

@section('scopriDiPiu')
    <a href="aPage-scopriDiPiu.php">Scopri di più</a>
@endsection

@section('contenuto')
    <div class="sotto-siti"></div>
    <section id="blocchi" class="sito-principale">
        <div data-tema="Fps" class="blocco pointer">
            <h4>Fps</h4>
            <p class='hidden'>Combatti orde di nemici in scenari a tema</p>
            <div class="block-overlay overlay dark-overlay"></div>
        </div>
        <div data-tema="Arcade" class="blocco pointer">
            <h4>Arcade</h4><p class='hidden'>Gioca ai giochi che hanno fatto la storia</p>
            <div class="block-overlay overlay dark-overlay"></div>
        </div>
        <div data-tema="Quiz" class="blocco pointer">
            <h4>Quiz</h4><p class='hidden'>Quanto pensi di conoscere bene le cose?</p>
            <div class="block-overlay overlay dark-overlay"></div>
        </div>
        <div data-tema="Corsa" class="blocco pointer" >
            <h4>Corsa</h4><p class='hidden'>Guida in alcuni dei circuiti più famosi al mondo</p>
            <div class="block-overlay overlay dark-overlay"></div>
        </div>
        <div data-tema="VediTutto" class="blocco pointer">
            <h4>Tutto</h4><p class='hidden'>Perchè vedere una categoria alla volta?</p>
            <div class="block-overlay overlay dark-overlay"></div>
        </div>
    </section>
@endsection