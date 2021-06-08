<?php

use Illuminate\Database\Eloquent\Model;

class FpsGame extends Model{
    public function Game(){
        return $this->belongsTo("Game");
    }
}

?>