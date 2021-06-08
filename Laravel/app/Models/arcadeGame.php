<?php

use Illuminate\Database\Eloquent\Model;

class ArcadeGame extends Model{
    public function Game(){
        return $this->belongsTo("Game");
    }
}

?>