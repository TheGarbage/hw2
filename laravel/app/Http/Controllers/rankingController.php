<?php

use Illuminate\Routing\Controller as BaseController;

class rankingController extends BaseController{
    public function openRanking(){
        $response = array(
            'ranking' => DB::select('CALL proc2(100)')
        );
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            foreach($response['ranking'] as $item)
                if($item->username ===  $user->username)
                    $response['user'] =  $item;
            if(!isset($response['user']))
                $response['user'] =  (object)array(
                    'posizione' => 'N/d',
                    'username'  =>  $user->username,
                    'anno_nascita' => explode('-', $user->anno_nascita, 2)[0],
                    'media_punteggio' => 'N/d',
                    'media_sconto' => 'N/d',
                    'punti_totali' => 0
                );
            return view('classifica')
                ->with('nome', $user->nome)
                ->with('dati', $response);
        }
        return view('classifica')
            ->with('dati', $response);
    }
}

?>
