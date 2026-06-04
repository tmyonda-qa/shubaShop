<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Super Admin (ти)
        User::updateOrCreate(
            ['email' => 'admin@shubka.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('admin123'),
                'is_admin' => true,
                'role' => 'super_admin',
            ]
        );

        // Sub Admin для прикладу
        User::updateOrCreate(
            ['email' => 'manager@shubka.com'],
            [
                'name' => 'Менеджер',
                'password' => Hash::make('manager123'),
                'is_admin' => true,
                'role' => 'sub_admin',
            ]
        );
    }
}
