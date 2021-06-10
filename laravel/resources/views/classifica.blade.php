@extends('layouts.layout')

@section('style')
        <link rel="stylesheet" href='{{ url("css/classifica.css") }}' >
@endsection

@section('ludoteca', "Ludoteca")

@section('sovraDescrzione')
        <ul id="titolo">
            <li>Classifica</li>
        </ul>
@endsection

@section('descrizione', "Ecco i 100 giocatori che sono riusciti a conquistare più punti di tutti.
                         Bisogna avere almeno un punto per essere classificati. Lottate per rientrarci!"
)

@section('contenuto')
    @if(isset($dati['user']))
        <table> 
            <caption>- - -  LA TUA POSIZIONE  - - -</caption>
            <thead> 
                <tr> 
                    <th>N</th> <th>Username</th> <th>Anno Nascita</th> <th>Punteggio Medio</th> <th>Sconto Medio</th> <th>Punti Totali</th> 
                </tr> 
            </thead> 
            <tbody>
                <tr> 
                    <th>{{ $dati['user']->posizione }}</th> <th>{{ $dati['user']->username }}</th> <th>{{ $dati['user']->anno_nascita }}</th> <th>{{ $dati['user']->media_punteggio }}</th> <th>{{ $dati['user']->media_sconto }}</th> <th>{{ $dati['user']->punti_totali }}</th>
                </tr>
            </tbody>
        </table>
    @endIf
    <table> 
        <caption>- - -  TOP 100  - - -</caption>
        <thead> 
            <tr> 
                <th>N</th> <th>Username</th> <th>Anno Nascita</th> <th>Punteggio Medio</th> <th>Sconto Medio</th> <th>Punti Totali</th> 
            </tr> 
        </thead>
        <tbody>
    @foreach($dati['ranking'] as $user)
        <tr> 
            <th>{{ $user->posizione }}</th> <th>{{ $user->username }}</th> <th>{{ $user->anno_nascita }}</th> <th>{{ $user->media_punteggio }}</th> <th>{{ $user->media_sconto }}</th> <th>{{ $user->punti_totali }}</th>
        </tr>
    @endforeach
        </tbody> 
    </table>
@endsection