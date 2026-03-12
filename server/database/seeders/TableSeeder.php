<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    public function run(): void
    {
        $tablesRestaurant1 = [
            ['name' => 'Masa 1', 'min_capacity' => 1, 'max_capacity' => 2],
            ['name' => 'Masa 2', 'min_capacity' => 1, 'max_capacity' => 2],
            ['name' => 'Masa 3', 'min_capacity' => 2, 'max_capacity' => 4],
            ['name' => 'Masa 4', 'min_capacity' => 2, 'max_capacity' => 4],
            ['name' => 'Masa 5', 'min_capacity' => 4, 'max_capacity' => 6],
            ['name' => 'Masa 6', 'min_capacity' => 4, 'max_capacity' => 6],
            ['name' => 'Masa 7', 'min_capacity' => 6, 'max_capacity' => 8],
            ['name' => 'Masa 8', 'min_capacity' => 8, 'max_capacity' => 12],
        ];

        foreach ($tablesRestaurant1 as $table) {
            Table::create([
                'restaurant_id' => 1,
                'name' => $table['name'],
                'min_capacity' => $table['min_capacity'],
                'max_capacity' => $table['max_capacity'],
            ]);
        }

        $tablesRestaurant2 = [
            ['name' => 'Masa A', 'min_capacity' => 1, 'max_capacity' => 2],
            ['name' => 'Masa B', 'min_capacity' => 2, 'max_capacity' => 4],
            ['name' => 'Masa C', 'min_capacity' => 4, 'max_capacity' => 6],
            ['name' => 'Masa D', 'min_capacity' => 6, 'max_capacity' => 10],
        ];

        foreach ($tablesRestaurant2 as $table) {
            Table::create([
                'restaurant_id' => 2,
                'name' => $table['name'],
                'min_capacity' => $table['min_capacity'],
                'max_capacity' => $table['max_capacity'],
            ]);
        }
    }
}
