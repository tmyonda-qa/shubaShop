<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SubAdminController extends Controller
{
    public function index()
    {
        $admins = User::whereIn('role', ['super_admin', 'sub_admin'])
            ->withCount('activityLogs')
            ->latest()
            ->get();

        return response()->json($admins);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => true,
            'role' => 'sub_admin',
        ]);

        return response()->json($user, 201);
    }

    public function update(Request $request, User $user)
    {
        if ($user->isSuperAdmin()) {
            return response()->json(['message' => 'Не можна редагувати головного адміна'], 403);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|min:6',
            'role' => 'sometimes|in:sub_admin,user',
        ]);

        $data = $request->only(['name', 'email', 'role']);
        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json($user);
    }

    public function destroy(User $user)
    {
        if ($user->isSuperAdmin()) {
            return response()->json(['message' => 'Не можна видалити головного адміна'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'Адміна видалено']);
    }
}
