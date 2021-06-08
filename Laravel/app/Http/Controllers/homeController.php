<?php

use Illuminate\Routing\Controller as BaseController;

class homeController extends BaseController{
    public function openHome(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user))
            return view('home')
                ->with('nome', $user->nome);
        return view('home');
    }

    public function datiBanner(){
        $jsonCasi = Http::get('https://covid-api.mmediagroup.fr/v1/cases', [
                'country' => "Italy"
            ]);
        $jsonVaccini = Http::get('https://covid-api.mmediagroup.fr/v1/vaccines', [
                'country' => "Italy"
        ]);
        if($jsonCasi->failed() || $jsonVaccini->failed()) 
            return ['risposta' => "Impossibile connettersi all'api"];
        $response = array(
            'casi' => array( 
                'popolazione' => $jsonCasi['All']['population'],
                'n_casi' => $jsonCasi['All']['confirmed'],
                'data_aggiornamento' => $jsonCasi['Sicilia']['updated']
            ),
            'vaccini' => array( 
                'popolazione' => $jsonVaccini['All']['population'],
                'n_doppia_dose' => $jsonVaccini['All']['people_vaccinated'],
                'data_aggiornamento' => $jsonVaccini['All']['updated']
            )
        );
        return $response;
    }
}

?>
