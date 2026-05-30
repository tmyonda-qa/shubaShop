<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(
            Order::with('product')->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'message' => 'nullable|string',
            'chest' => 'nullable|integer',
            'hips' => 'nullable|integer',
            'product_length' => 'nullable|integer',
            'height' => 'nullable|integer',
        ]);

        $order = Order::create($request->all());

        return response()->json($order->load('product'), 201);
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:new,in_progress,done',
        ]);

        $order->update(['status' => $request->status]);

        return response()->json($order);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['message' => 'Замовлення видалено']);
    }
}
