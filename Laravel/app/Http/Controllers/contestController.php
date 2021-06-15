<?php

use Illuminate\Routing\Controller as BaseController;

class contestController extends BaseController{
    public function openContest(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            if(request('errore') !== null)
                return view('contest')
                    ->with('nome', $user->nome)
                    ->with('id', $user->id)
                    ->with('response', request('errore'))
                    ->with('errore', "true");
            if(isset($user->Contest))
                return view('contest')
                    ->with('nome', $user->nome)
                    ->with('id', $user->id)
                    ->with('response', $user->Contest->nome_videogioco);
            return view('contest')
                ->with('nome', $user->nome)
                ->with('id', $user->id);
        }
        return view('contest');
    }

    private function creaResponse($json){
        $response = array();
        foreach($json['results'] as $item)
            if(isset($item['short_screenshots'][0]))
                $response[] = array(
                    "name" => $item['name'],
                    "image" => $item['short_screenshots'][0]['image'],
                    "metacritic" => $item['metacritic']
                );
        return $response;
    }

    public function defaultResearch(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            $json = Http::get('https://api.rawg.io/api/games', [
                'key' => env("RAWG_API_KEY"),
                'ordering' => "-metacritic",
                'page_size' => 50
            ]);
            return $this->creaResponse($json);
        }
        return ['risposta' => "Non risulta una sessione aperta"];
    }

    public function search($game){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            $json = Http::get('https://api.rawg.io/api/games', [
                'key' => env("RAWG_API_KEY"),
                'search' => $game
            ]);
            if($json->failed()) 
                return ['risposta' => "Impossibile connettersi all'api"];
            return $this->creaResponse($json);
        }
        return ['risposta' => "Non risulta una sessione aperta"];
    }

    public function select($game){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            if(isset($user->Contest))
                return ['risposta' => "Si è verificato un errore, scelta già fatta"];
            $bool = $user->Contest()->create([
                'nome_videogioco' => $game
            ]);
            if($bool)
                return ['risposta' => "ok"];
            return ['risposta' => "Si è verificato un errore, riprovare"];
        }
        return ['risposta' => "Non risulta una sessione aperta"];
    }

    public function delete(){
        $user = User::find(session('userNameLudoteca'));
        if(isset($user)){
            if(isset($user->Contest)){
                $user->Contest->delete();
                return redirect('contest');
            }
            $errore = "Si è verificato un errore, scelta non ancora fatta";
        }
        else 
            $errore = "Non risulta una sessione aperta";
        return redirect('contest?errore='.urlencode($errore));
    }
}

?>
