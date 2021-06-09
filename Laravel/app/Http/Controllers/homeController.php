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

    public function openScopriDiPiu(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user))
            return view('scopriDiPiu')
                ->with('nome', $user->nome);
        return view('scopriDiPiu');
    }

    public function readGames($filter){
        $response = array();
        $response[] = array('categoriaRisultati' => $filter);
        $gameArr = array();
        if($filter === "Fps" || $filter === "VediTutto"){
            $games = FpsGame::get();
            foreach($games as $game)
                $gameArr[] = array(
                    'titolo' => $game->Game['titolo'],
                    'categoria' => "Fps",
                    'codice' => $game->Game['id'],
                    'descrizione' => "Pegi: ".$game->Game['pegi']."<br>Record-Uccisioni: ".$game['Record_uccisioni_partita']."<br>Genere: ".$game['genere']
                );
        }
        if($filter === "Arcade" || $filter === "VediTutto"){
            $games = ArcadeGame::get();
            foreach($games as $game)
                $gameArr[] = array(
                    'titolo' => $game->Game['titolo'],
                    'categoria' => "Arcade",
                    'codice' => $game->Game['id'],
                    'descrizione' => "Pegi: ". $game->Game['pegi']."</br>Record-punti: ".$game['record_punteggio']
                );
        }
        if($filter === "Corsa" || $filter === "VediTutto"){
            $games = RacingGame::get();
            foreach($games as $game)
                $gameArr[] = array(
                    'titolo' => $game->Game['titolo'],
                    'categoria' => "Corsa",
                    'codice' => $game->Game['id'],
                    'descrizione' => "Pegi: ".$game->Game['pegi']."</br>T-record: ".$game['tempo_record']."</br>Tipo-gara: ".$game['tipo_gara']
                );
        }
        if($filter === "Quiz" || $filter === "VediTutto"){
            $games = QuizGame::get();
            foreach($games as $game)
                $gameArr[] = array(
                    'titolo' => $game->Game['titolo'],
                    'categoria' => "Quiz",
                    'codice' => $game->Game['id'],
                    'descrizione' => "Pegi: ".$game->Game['pegi']."</br>N_domande: ".$game['n_domande']."</br>Argomento: ".$game['argomento']
                );
        }
        $response[] = array('videogiochi' => $gameArr);
        return $response;
    }
}

?>
