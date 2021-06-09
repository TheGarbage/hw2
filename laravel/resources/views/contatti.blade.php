@extends('layouts.layout')

@section('style')
    <link rel="stylesheet" href='{{ url("css/contatti.css") }}'>
@endsection

@section('ludoteca', "Ludoteca")

@section('sovraDescrzione')
        <ul id="titolo">
            <li>Contatti</li>
        </ul>
@endsection

@section('descrizione')
Numero di telefono: +39 0951234567 <br>
E-mail: ludoteca@bucchieri.it <br>
Indirizzo: via ludoteca 27, 95000, catania </br> </br>
Aperti tutti i giorni dalle 9.00 alle 21.30 orario continuato.
@endsection