<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostureController;

// Use a redirect to the dashboard route to avoid calling controller methods statically
Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('/dashboard', [PostureController::class, 'dashboard'])->name('dashboard');
Route::get('/riwayat', [PostureController::class, 'riwayat'])->name('riwayat');
