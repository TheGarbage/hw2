<?php

use Illuminate\Routing\Controller as BaseController;

class gamesController extends BaseController{
    public function readGames($filter){
        $response = array();
        $response[] = array('categoriaRisultati' => $filter);
        $gameArr = array();
        if($filter === "Fps" || $filter === "VediTutto"){
            $games = FpsGame::get();
            foreach($games as $game)
                $gameArr[] = array('titolo' => $game->Game['titolo'],
                                       'categoria' => "Fps",
                                       'codice' => $game->Game['id'],
                                       'descrizione' => "Pegi: ".$game->Game['pegi']."<br>Record-Uccisioni: ".$game['Record_uccisioni_partita']."<br>Genere: ".$game['genere']);
        }
        if($filter === "Arcade" || $filter === "VediTutto"){
            $games = ArcadeGame::get();
            foreach($games as $game)
                $gameArr[] = array('titolo' => $game->Game['titolo'],
                                       'categoria' => "Arcade",
                                       'codice' => $game->Game['id'],
                                       'descrizione' => "Pegi: ". $game->Game['pegi']."</br>Record-punti: ".$game['record_punteggio']);
        }
        if($filter === "Corsa" || $filter === "VediTutto"){
            $games = RacingGame::get();
            foreach($games as $game)
                $gameArr[] = array('titolo' => $game->Game['titolo'],
                                       'categoria' => "Corsa",
                                       'codice' => $game->Game['id'],
                                       'descrizione' => "Pegi: ".$game->Game['pegi']."</br>T-record: ".$game['tempo_record']."</br>Tipo-gara: ".$game['tipo_gara']);
        }
        if($filter === "Quiz" || $filter === "VediTutto"){
            $games = QuizGame::get();
            foreach($games as $game)
                $gameArr[] = array('titolo' => $game->Game['titolo'],
                                       'categoria' => "Quiz",
                                       'codice' => $game->Game['id'],
                                       'descrizione' => "Pegi: ".$game->Game['pegi']."</br>N_domande: ".$game['n_domande']."</br>Argomento: ".$game['argomento']);
        }
        $response[] = array('videogiochi' => $gameArr);
        return $response;
    }

    public function readFavorites(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            $response = array();
            foreach($user->Games as $item)
                $response[] = $item['pivot']['game_id'];
            return $response;
        }
        return ['risposta' => "Non risulta una sessione aperta"];
    }

    public function insertFavorite($game_id){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            if($user->Games()->where('game_id', $game_id)->first() !== null)
                return ['risposta' => "Si è verificato un errore, gioco già preferito"];
            $user->Games()->attach($game_id);
            return['risposta' => "ok"];
        }
        return ['risposta' => "Non risulta una sessione aperta"];
    }

    public function deleteFavorite($game_id){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            if($user->Games()->where('game_id', $game_id)->first() === null)
                return ['risposta' => "Si è verificato un errore, gioco non preferito"];
            $user->Games()->detach($game_id);
            return['risposta' => "ok"];
        }
        return ['risposta' => "Non risulta una sessione aperta"];
    }
}

?>
