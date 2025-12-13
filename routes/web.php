<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostureController;

Route::get('/', function () {
    return app()->call([PostureController::class, 'dashboard']);
});

Route::get('/dashboard', [PostureController::class, 'dashboard'])->name('dashboard');
Route::get('/riwayat', [PostureController::class, 'riwayat'])->name('riwayat');
