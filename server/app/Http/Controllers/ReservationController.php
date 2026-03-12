<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Table;
use App\Services\WebSocketService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReservationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $restaurantId = $request->header('X-Restaurant-Id');
        
        if (!$restaurantId) {
            return response()->json(['error' => 'Restaurant ID header required'], 400);
        }

        $date = $request->query('date', Carbon::today()->toDateString());

        $reservations = Reservation::with('table')
            ->where('restaurant_id', $restaurantId)
            ->whereDate('reservation_date', $date)
            ->orderBy('reservation_time')
            ->get();

        return response()->json($reservations);
    }

    public function store(Request $request): JsonResponse
    {
        $restaurantId = $request->header('X-Restaurant-Id');
        
        if (!$restaurantId) {
            return response()->json(['error' => 'Restaurant ID header required'], 400);
        }

        $validated = $request->validate([
            'guest_name' => 'required|string|max:255',
            'guest_count' => 'required|integer|min:1',
            'reservation_date' => 'required|date',
            'reservation_time' => 'required|date_format:H:i',
            'table_id' => 'nullable|exists:tables,id',
        ]);

        $tableId = $validated['table_id'] ?? null;

        if (!$tableId) {
            $suggestedTable = $this->suggestTable(
                $restaurantId,
                $validated['guest_count'],
                $validated['reservation_date'],
                $validated['reservation_time']
            );

            if (!$suggestedTable) {
                return response()->json(['error' => 'No available table for this reservation'], 422);
            }

            $tableId = $suggestedTable->id;
        }

        $reservation = Reservation::create([
            'restaurant_id' => $restaurantId,
            'table_id' => $tableId,
            'guest_name' => $validated['guest_name'],
            'guest_count' => $validated['guest_count'],
            'reservation_date' => $validated['reservation_date'],
            'reservation_time' => $validated['reservation_time'],
            'status' => 'confirmed',
        ]);

        $reservation->load('table');

        WebSocketService::broadcast($restaurantId, 'reservation_created', $reservation->toArray());

        return response()->json($reservation, 201);
    }

    public function suggestTableEndpoint(Request $request): JsonResponse
    {
        $restaurantId = $request->header('X-Restaurant-Id');
        
        if (!$restaurantId) {
            return response()->json(['error' => 'Restaurant ID header required'], 400);
        }

        $validated = $request->validate([
            'guest_count' => 'required|integer|min:1',
            'reservation_date' => 'required|date',
            'reservation_time' => 'required|date_format:H:i',
        ]);

        $table = $this->suggestTable(
            $restaurantId,
            $validated['guest_count'],
            $validated['reservation_date'],
            $validated['reservation_time']
        );

        if (!$table) {
            return response()->json(['error' => 'No available table'], 404);
        }

        return response()->json($table);
    }

    private function suggestTable(int $restaurantId, int $guestCount, string $date, string $time): ?Table
    {
        $reservationTime = Carbon::parse($time);
        $startWindow = $reservationTime->copy()->subHours(2);
        $endWindow = $reservationTime->copy()->addHours(2);

        $occupiedTableIds = Reservation::where('restaurant_id', $restaurantId)
            ->whereDate('reservation_date', $date)
            ->whereTime('reservation_time', '>=', $startWindow->format('H:i'))
            ->whereTime('reservation_time', '<=', $endWindow->format('H:i'))
            ->whereIn('status', ['pending', 'confirmed'])
            ->pluck('table_id');

        return Table::where('restaurant_id', $restaurantId)
            ->where('min_capacity', '<=', $guestCount)
            ->where('max_capacity', '>=', $guestCount)
            ->whereNotIn('id', $occupiedTableIds)
            ->orderBy('max_capacity')
            ->first();
    }
}
