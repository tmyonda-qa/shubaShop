<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private function log(Request $request, string $action, Order $order, array $details = [])
    {
        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => $action,
            'entity_type' => 'order',
            'entity_id' => $order->id,
            'details' => array_merge([
                'phone' => $order->phone,
                'status' => $order->status,
            ], $details),
        ]);
    }

   public function index()
   {
       return response()->json(
           Order::with(['product', 'takenBy'])->latest()->get()
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

        $oldStatus = $order->status;
        $data = ['status' => $request->status];

        if ($request->status === 'in_progress' && !$order->taken_by) {
            $data['taken_by'] = $request->user()->id;
            $data['taken_at'] = now();
        }

        $order->update($data);

        $this->log($request, 'змінив статус замовлення', $order, [
            'old_status' => $oldStatus,
            'new_status' => $request->status,
        ]);

        return response()->json($order->load(['product', 'takenBy']));
    }

    public function destroy(Request $request, Order $order)
    {
        $this->log($request, 'видалив замовлення', $order);
        $order->delete();
        return response()->json(['message' => 'Замовлення видалено']);
    }
}
