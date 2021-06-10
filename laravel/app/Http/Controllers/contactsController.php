<?php

use Illuminate\Routing\Controller as BaseController;

class contactsController extends BaseController{
    public function openContacts(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user))
            return view('contatti')
                ->with('nome', $user->nome);
        return view('contatti');
    }
}

?>
