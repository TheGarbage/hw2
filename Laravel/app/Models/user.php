<?php

use Illuminate\Database\Eloquent\Model;

class User extends Model{
    public function Games(){
        return $this->belongsToMany("Game");
    }

    public function Contest(){
        return $this->hasOne("Contest");
    }

    public function Registers(){
        return $this->hasMany("Register");
    }

    protected $hidden = [
        'password'
    ];

    protected $fillable = [
        'username',
        'password',
        'nome',
        'anno_nascita',
        'occupazione'
    ];

    protected $casts = [
        'anno_nascita' => 'datetime'
    ];
}

?>