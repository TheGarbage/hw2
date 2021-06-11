<?php

use Illuminate\Routing\Controller as BaseController;

class infoProfiloController extends BaseController{
    public function openInfoProfilo(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            if(count($user->Registers) === 0)
                return view('infoProfilo')
                    ->with('nome', $user->nome)
                    ->with('dati', array(
                        'nome' => $user->nome,
                        'username' => $user->username,
                        'data_nascita' => $user->anno_nascita,
                        'occupazione' => $user->occupazione,
                ));
            $spesa = 0;
            $sconto = 0;
            $N_righe = 0;
            $punteggio = 0;
            $transazioni = array();
            foreach($user->Registers as $item){
                $spesa += $item->spesa;
                $sconto += $item->sconto;
                $N_righe++;
                $punteggio += $item->punteggio;
                $transazioni[] = array(
                    'inizio' => $item->inizio,
                    'fine' => $item->fine,
                    'durata' => $item->inizio->diff($item->fine)->format("%H:%I:%S"),
                    'sconto' => $item->sconto,
                    'spesa' => $item->spesa,
                    'punteggio' => $item->punteggio
                );
            }
            return view('infoProfilo')
                    ->with('nome', $user->nome)
                    ->with('dati', array(
                        'nome' => $user->nome,
                        'username' => $user->username,
                        'data_nascita' => $user->anno_nascita,
                        'occupazione' => $user->occupazione,
                        'transazioni' => $transazioni,
                        'riepilogo' => array(
                            'punteggio_totale' => $punteggio,
                            'spesa_totale' => round($spesa, 2),
                            'sconto_medio' => round($sconto/$N_righe, 2)
            )));
        }
        return redirect('login/infoProfilo');
    }
}

?>
