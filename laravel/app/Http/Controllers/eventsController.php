<?php

use Illuminate\Routing\Controller as BaseController;

class eventsController extends BaseController{
    public function openEvents(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user))
            return view('eventi')
                ->with('nome', $user->nome);
        return view('eventi');
    }

    public function getEvents(){
        $events = DB::select("CALL proc4()");
        $user = User::find(session('userNameLudoteca'));
        $nonPreferiti = array();
        if(isset($user)){
            $preferiti = array();
            foreach($events as $event)
                if($user->Games()->where('game_id', $event->game_id)->first() !== null)
                    $preferiti[] = array( 
                        'titolo' => $event->titolo,
                        'tempoRimasto' => $event->tempo_rimasto,
                        'descrizione' => $event->nome."<br>Modificatore Bonus: ".$event->modificatore_bonus."x<br>modificatore difficoltà: ".$event->modificatore_difficolta."x"
                    );
                else 
                    $nonPreferiti[] = array( 
                        'titolo' => $event->titolo,
                        'tempoRimasto' => $event->tempo_rimasto,
                        'descrizione' => $event->nome."<br>Modificatore Bonus: ".$event->modificatore_bonus."x<br>modificatore difficoltà: ".$event->modificatore_difficolta."x"
                    );
            if(count($preferiti) !== 0)
                return array(
                    'nonPreferiti' => $nonPreferiti,
                    'preferiti' => $preferiti
                );
            return array(
                'nonPreferiti' => $nonPreferiti
            );
        }
        foreach($events as $event)
            $nonPreferiti[] = array( 
                'titolo' => $event->titolo,
                'tempoRimasto' => $event->tempo_rimasto,
                'descrizione' => $event->nome."<br>Modificatore Bonus: ".$event->modificatore_bonus."x<br>modificatore difficoltà: ".$event->modificatore_difficolta."x"
            );
        return array(
            'nonPreferiti' => $nonPreferiti
        );
    }
}

?>
