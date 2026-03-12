<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    public function run(): void
    {
        Restaurant::create([
            'id' => 1,
            'name' => 'La Bella Italia',
            'address' => 'Strada Victoriei 123, Bucuresti',
        ]);

        Restaurant::create([
            'id' => 2,
            'name' => 'Casa Traditionala',
            'address' => 'Bulevardul Unirii 45, Cluj-Napoca',
        ]);
    }
}
