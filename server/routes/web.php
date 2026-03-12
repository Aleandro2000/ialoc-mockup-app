<?php

use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\WebSocketController;
use Illuminate\Support\Facades\Route;

// Health check endpoint for Docker
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toISOString(),
        'service' => 'ialoc-api'
    ]);
});

Route::prefix('api')->middleware('cors')->group(function () {
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::post('/reservations/suggest-table', [ReservationController::class, 'suggestTableEndpoint']);
    
    Route::get('/tables', [TableController::class, 'index']);
    
    Route::get('/ws/poll', [WebSocketController::class, 'poll']);
});

Route::get('/', function () {
    return view('welcome');
});
