<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\Admin\ActivityLogController;
use App\Http\Controllers\Api\Admin\SubAdminController;
use App\Http\Controllers\Api\Admin\StatsController;
use App\Http\Controllers\Api\Admin\HeroSettingsController;
use Illuminate\Support\Facades\Route;

// Публічні роути
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::post('/orders', [OrderController::class, 'store']);

Route::get('/hero-settings', [HeroSettingsController::class, 'show']);

Route::post('/track', [\App\Http\Controllers\Api\PageViewController::class, 'track']);

// Захищені роути
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Будь-який адмін
    Route::middleware('admin')->group(function () {
        Route::apiResource('admin/categories', CategoryController::class)->except(['index', 'show']);
        Route::apiResource('admin/products', ProductController::class)->except(['index', 'show']);
        Route::get('admin/orders', [OrderController::class, 'index']);
        Route::patch('admin/orders/{order}', [OrderController::class, 'update']);
        Route::delete('admin/orders/{order}', [OrderController::class, 'destroy']);
        Route::get('admin/stats', [StatsController::class, 'index']);
        Route::post('admin/hero-settings', [HeroSettingsController::class, 'update']);
    });

    // Тільки super_admin
    Route::middleware(['admin', 'super_admin'])->group(function () {
        Route::get('admin/activity-logs', [ActivityLogController::class, 'index']);
        Route::get('admin/sub-admins', [SubAdminController::class, 'index']);
        Route::post('admin/sub-admins', [SubAdminController::class, 'store']);
        Route::put('admin/sub-admins/{user}', [SubAdminController::class, 'update']);
        Route::delete('admin/sub-admins/{user}', [SubAdminController::class, 'destroy']);
        Route::get('admin/page-views', [\App\Http\Controllers\Api\PageViewController::class, 'stats']);
    });
});
