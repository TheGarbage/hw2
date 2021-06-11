<?php

use Illuminate\Database\Eloquent\Model;

class Register extends Model{
    protected $casts = [
        'inizio' => 'datetime',
        'fine' => 'datetime',
        'spesa' => 'double',
        'sconto' => 'double',
        'punteggio' => 'integer'
    ];
}

?>