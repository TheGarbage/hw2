<?php

use Illuminate\Routing\Controller as BaseController;

class loginController extends BaseController{
    public function form($url = 'home'){
        if(session('userNameLudoteca') != null)
        return redirect('home');
        $old_username = Request::old('userName');
        return view('login')
            ->with('old_username', $old_username)
            ->with('url', $url);
    }

    public function checkLogin($url = 'home'){
        $user = User::where('username', request('userName'))->first();
        if(isset($user) && password_verify(request('passWord'), $user->password)){
            Session::put("userNameLudoteca", $user->id);
            return redirect($url);
        }
        return redirect('login')
            ->withInput();
    }

    public function logout(){
        Session::flush();
        return redirect('home');
    }
}

?>
