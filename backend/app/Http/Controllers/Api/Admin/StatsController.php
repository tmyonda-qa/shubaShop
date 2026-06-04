<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class StatsController extends Controller
{
    public function index()
    {
        return response()->json([
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'new_orders' => Order::where('status', 'new')->count(),
            'in_progress_orders' => Order::where('status', 'in_progress')->count(),
            'done_orders' => Order::where('status', 'done')->count(),
            'total_admins' => User::whereIn('role', ['super_admin', 'sub_admin'])->count(),
            'recent_activities' => ActivityLog::with('user')
                ->latest()
                ->take(10)
                ->get(),
        ]);
    }
}
