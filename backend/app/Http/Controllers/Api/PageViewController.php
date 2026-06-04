<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageView;
use Illuminate\Http\Request;

class PageViewController extends Controller
{
    public function track(Request $request)
    {
        PageView::create([
            'page' => $request->page ?? '/',
            'event' => $request->event ?? 'view',
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json(['ok' => true]);
    }

    public function stats()
    {
        $total = PageView::count();
        $today = PageView::whereDate('created_at', today())->count();
        $catalogClicks = PageView::where('event', 'catalog_click')->count();
        $catalogClicksToday = PageView::where('event', 'catalog_click')->whereDate('created_at', today())->count();

        $popularPages = PageView::select('page')
            ->selectRaw('count(*) as count')
            ->groupBy('page')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        $last7days = PageView::selectRaw('DATE(created_at) as date, count(*) as count')
            ->whereDate('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json([
            'total' => $total,
            'today' => $today,
            'catalog_clicks' => $catalogClicks,
            'catalog_clicks_today' => $catalogClicksToday,
            'popular_pages' => $popularPages,
            'last_7_days' => $last7days,
        ]);
    }
}
