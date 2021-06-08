<?php

use Illuminate\Database\Eloquent\Model;

class QuizGame extends Model{
    public function Game(){
        return $this->belongsTo("Game");
    }
}

?>