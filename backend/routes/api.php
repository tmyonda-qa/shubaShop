<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

// Публічні роути
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::post('/orders', [OrderController::class, 'store']);

// Захищені роути (тільки авторизовані)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Тільки адмін
    Route::middleware('admin')->group(function () {
        Route::apiResource('admin/categories', CategoryController::class)->except(['index', 'show']);
        Route::apiResource('admin/products', ProductController::class)->except(['index', 'show']);
        Route::get('admin/orders', [OrderController::class, 'index']);
        Route::patch('admin/orders/{order}', [OrderController::class, 'update']);
        Route::delete('admin/orders/{order}', [OrderController::class, 'destroy']);
    });
});
