<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class ReservationFactory extends Factory
{
    protected $model = Reservation::class;

    public function definition(): array
    {
        return [
            'restaurant_id' => Restaurant::factory(),
            'table_id' => Table::factory(),
            'guest_name' => fake()->name(),
            'guest_count' => fake()->numberBetween(1, 8),
            'reservation_date' => Carbon::today(),
            'reservation_time' => fake()->time('H:i'),
            'status' => fake()->randomElement(['pending', 'confirmed']),
        ];
    }
}
