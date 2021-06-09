<?php

use Illuminate\Routing\Controller as BaseController;

class contattiController extends BaseController{
    public function openContatti(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user))
            return view('contatti')
                ->with('nome', $user->nome);
        return view('contatti');
    }
}

?>
