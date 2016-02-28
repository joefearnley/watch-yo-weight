<?php

Route::get('/', 'HomeController@index');
Route::get('/weight/all', 'WeightController@all');
Route::post('/weight/add', 'WeightController@add');
Route::post('/weight/delete', 'WeightController@delete');
Route::get('/weight/chart-data', 'WeightController@chartData');
