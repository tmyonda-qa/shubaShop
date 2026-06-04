<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSettings;
use Illuminate\Http\Request;

class HeroSettingsController extends Controller
{
    public function show()
    {
        $settings = HeroSettings::first();
        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|max:10240',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string',
        ]);

        $settings = HeroSettings::firstOrCreate([]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hero', 'public');
            $settings->update(['image_path' => $path]);
        }

        if ($request->title) {
            $settings->update(['title' => $request->title]);
        }

        if ($request->subtitle) {
            $settings->update(['subtitle' => $request->subtitle]);
        }

        return response()->json($settings);
    }
}
