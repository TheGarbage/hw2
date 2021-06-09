<?php

use Illuminate\Routing\Controller as BaseController;

class favoriteController extends BaseController{
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
