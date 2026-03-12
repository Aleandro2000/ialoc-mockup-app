<?php

namespace Database\Factories;

use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Database\Eloquent\Factories\Factory;

class TableFactory extends Factory
{
    protected $model = Table::class;

    public function definition(): array
    {
        $minCapacity = fake()->randomElement([1, 2, 4, 6]);
        $maxCapacity = $minCapacity + fake()->randomElement([0, 2, 4]);

        return [
            'restaurant_id' => Restaurant::factory(),
            'name' => 'Table ' . fake()->unique()->numberBetween(1, 100),
            'min_capacity' => $minCapacity,
            'max_capacity' => $maxCapacity,
        ];
    }
}
