<?php

use Illuminate\Database\Eloquent\Model;

class RacingGame extends Model{
    public function Game(){
        return $this->belongsTo("Game");
    }
}

?>