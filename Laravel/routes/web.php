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
Route::get('home/games/{filter}', 'homeController@readGames');

Route::get('scopriDiPiu', 'homeController@openScopriDiPiu')->name('scopriDiPiu');

Route::get('favorites/read', 'favoriteController@readFavorites');
Route::get('favorites/insert/{game_id}', 'favoriteController@insertFavorite');
Route::get('favorites/delete/{game_id}', 'favoriteController@deleteFavorite');

Route::get('contest/', 'contestController@openContest');
Route::get('contest/default', 'contestController@defaultResearch');
Route::get('contest/search/{game}', 'contestController@search');
Route::get('contest/select/{game}', 'contestController@select');
Route::get('contest/delete', 'contestController@delete');

Route::get('classifica', 'rankingController@openRanking')->name('classifica');

Route::get('eventi', 'eventsController@openEvents')->name('eventi');
Route::get('eventi/get', 'eventsController@getEvents');

Route::get('contatti', 'contactsController@openContacts')->name('contatti');

Route::get('infoProfilo', 'infoProfiloController@openInfoProfilo')->name('infoProfilo')
?>