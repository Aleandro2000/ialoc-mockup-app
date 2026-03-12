<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        $today = Carbon::today();
        
        $reservationsRestaurant1 = [
            [
                'table_id' => 1,
                'guest_name' => 'Ion Popescu',
                'guest_count' => 2,
                'reservation_time' => '12:00',
            ],
            [
                'table_id' => 3,
                'guest_name' => 'Maria Ionescu',
                'guest_count' => 4,
                'reservation_time' => '13:30',
            ],
            [
                'table_id' => 5,
                'guest_name' => 'Andrei Georgescu',
                'guest_count' => 5,
                'reservation_time' => '19:00',
            ],
            [
                'table_id' => 7,
                'guest_name' => 'Elena Vasilescu',
                'guest_count' => 7,
                'reservation_time' => '20:30',
            ],
        ];

        foreach ($reservationsRestaurant1 as $reservation) {
            Reservation::create([
                'restaurant_id' => 1,
                'table_id' => $reservation['table_id'],
                'guest_name' => $reservation['guest_name'],
                'guest_count' => $reservation['guest_count'],
                'reservation_date' => $today,
                'reservation_time' => $reservation['reservation_time'],
                'status' => 'confirmed',
            ]);
        }

        $reservationsRestaurant2 = [
            [
                'table_id' => 9,
                'guest_name' => 'Alexandru Marin',
                'guest_count' => 2,
                'reservation_time' => '11:30',
            ],
            [
                'table_id' => 11,
                'guest_name' => 'Cristina Dobre',
                'guest_count' => 5,
                'reservation_time' => '14:00',
            ],
        ];

        foreach ($reservationsRestaurant2 as $reservation) {
            Reservation::create([
                'restaurant_id' => 2,
                'table_id' => $reservation['table_id'],
                'guest_name' => $reservation['guest_name'],
                'guest_count' => $reservation['guest_count'],
                'reservation_date' => $today,
                'reservation_time' => $reservation['reservation_time'],
                'status' => 'confirmed',
            ]);
        }
    }
}
