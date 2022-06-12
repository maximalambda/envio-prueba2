<?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\CSVController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/users',[UserController::class, 'index']);
Route::get('/users/{id}',[UserController::class, 'show']);
Route::get('/csv/export',[CSVController::class, 'export']);

Route::delete('/users/{id}',[UserController::class, 'delete']);

Route::post('/users/filter',[UserController::class, 'filter']);
