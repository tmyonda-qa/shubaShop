<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        foreach ([['Шуби','shuby'],['Шапки','shapky'],['Аксесуари','aksesuary']] as [$name, $slug]) {
            Category::firstOrCreate(['slug' => $slug], ['name' => $name]);
        }
    }
}
