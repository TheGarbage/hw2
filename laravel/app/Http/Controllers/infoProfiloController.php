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

    public function modificaNome(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            $user->nome = request('nome');
            $user->save();
            return array(
                'risposta' => "ok",
                'tipoDato' => "nome"
            );
        }
        return ['risposta' => "Non risulta una sessione aperta"];
    }

    public function modificaDataNascita(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            $user->anno_nascita = request('data');
            $user->save();
            return array(
                'risposta' => "ok",
                'tipoDato' => "data"
            );
        }
        return ['risposta' => "Non risulta una sessione aperta"];
    }

    public function modificaOccupazione(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            $user->occupazione = request('occupazione');
            $user->save();
            return array(
                'risposta' => "ok",
                'tipoDato' => "occupazione"
            );
        }
        return ['risposta' => "Non risulta una sessione aperta"];
    }

    public function modificaPassword(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            if (password_verify(request('vecchiaPassword'), $user->password)){
                $user->password = password_hash(request('nuovaPassword'), PASSWORD_BCRYPT);
                $user->save();
                return ['risposta' => "ok"];
            }
            return ['risposta' => "falsaPassword"];
        }
        return ['risposta' => "Non risulta una sessione aperta"];
    }
}

?>
