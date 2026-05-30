<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'images'])->where('is_active', true);

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('article', 'like', "%{$request->search}%");
            });
        }

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->fur_type) {
            $query->where('fur_type', $request->fur_type);
        }

        if ($request->hood) {
            $query->where('hood', $request->hood);
        }

        if ($request->fastener) {
            $query->where('fastener', $request->fastener);
        }

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->length) {
            $query->where('length', $request->length);
        }

        if ($request->price_from) {
            $query->where('price', '>=', $request->price_from);
        }

        if ($request->price_to) {
            $query->where('price', '<=', $request->price_to);
        }

        return response()->json($query->paginate(12));
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'article' => 'required|string|unique:products',
            'price' => 'required|numeric|min:0',
            'images' => 'nullable|array',
            'images.*' => 'image|max:5120',
        ]);

        $product = Product::create($request->only([
            'category_id', 'name', 'article', 'description',
            'price', 'fur_type', 'hood', 'fastener', 'length', 'type',
        ]));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('products', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'is_main' => $index === 0,
                    'sort_order' => $index,
                ]);
            }
        }

        return response()->json($product->load('images'), 201);
    }

    public function show(Product $product)
    {
        return response()->json($product->load(['category', 'images']));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'name' => 'sometimes|string|max:255',
            'article' => 'sometimes|string|unique:products,article,' . $product->id,
            'price' => 'sometimes|numeric|min:0',
        ]);

        $product->update($request->only([
            'category_id', 'name', 'article', 'description',
            'price', 'fur_type', 'hood', 'fastener', 'length', 'type', 'is_active',
        ]));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('products', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'is_main' => false,
                    'sort_order' => $product->images()->count() + $index,
                ]);
            }
        }

        return response()->json($product->load('images'));
    }

    public function destroy(Product $product)
    {
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }
        $product->delete();
        return response()->json(['message' => 'Товар видалено']);
    }
}
