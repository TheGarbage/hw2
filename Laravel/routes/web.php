<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('home');
});



Route::get('login/{url?}', 'loginController@form');
Route::post('login/{url?}', 'loginController@checkLogin');
Route::get ('logout', 'loginController@logout');

Route::post('registration', 'registrationController@createAccount');

Route::get('home', 'homeController@openHome')->name('home');
Route::get('home/banner', 'homeController@datiBanner');

Route::get('games/{filter}', 'gamesController@readGames');

Route::get('favorites/read', 'gamesController@readFavorites');
Route::get('favorites/insert/{game_id}', 'gamesController@insertFavorite');
Route::get('favorites/delete/{game_id}', 'gamesController@deleteFavorite');

Route::get('contest/', 'contestController@openContest')->name('contest');
Route::get('contest/default', 'contestController@defaultResearch');
Route::get('contest/search/{game}', 'contestController@search');
Route::get('contest/select/{game}', 'contestController@select');
Route::get('contest/delete', 'contestController@delete');

?>