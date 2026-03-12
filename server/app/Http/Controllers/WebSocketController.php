<?php

namespace App\Http\Controllers;

use App\Services\WebSocketService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebSocketController extends Controller
{
    public function poll(Request $request): JsonResponse
    {
        $restaurantId = $request->header('X-Restaurant-Id');
        
        if (!$restaurantId) {
            return response()->json(['error' => 'Restaurant ID header required'], 400);
        }

        $since = (int) $request->query('since', 0);
        $messages = WebSocketService::getMessages($restaurantId, $since);

        return response()->json([
            'messages' => array_map(fn($m) => json_decode($m['message'], true), $messages),
            'timestamp' => now()->timestamp,
        ]);
    }
}
