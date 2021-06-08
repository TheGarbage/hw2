<?php

use Illuminate\Routing\Controller as BaseController;

class registrationController extends BaseController{
    public function createAccount(){
        $exist = User::where('username', request('userName'))->exists();   
        if(!$exist){
            $bool = User::create([
                'username' => request('userName'),
                'password' => password_hash(request('passWord'), PASSWORD_BCRYPT),
                'nome' => request('nomeCognome'),
                'anno_nascita' => request('dataNascita'),
                'occupazione' => request('occupazione')
            ]);
            if($bool)
                return ['risposta' => "ok"];
            return ['risposta' => "Si è verificato un errore, riprovare"];
        }
        return ['risposta' => "Username non disponibile"];
    }
}

?>
