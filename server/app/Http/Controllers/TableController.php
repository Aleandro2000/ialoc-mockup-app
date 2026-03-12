<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $restaurantId = $request->header('X-Restaurant-Id');
        
        if (!$restaurantId) {
            return response()->json(['error' => 'Restaurant ID header required'], 400);
        }

        $tables = Table::where('restaurant_id', $restaurantId)
            ->orderBy('name')
            ->get();

        return response()->json($tables);
    }
}
