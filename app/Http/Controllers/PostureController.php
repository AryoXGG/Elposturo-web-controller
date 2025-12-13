<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostureController extends Controller
{
    public function dashboard()
    {
        // In real app, you'd fetch live posture data here
        $data = [
            'status' => 'Normal',
            'pressure' => 14,
            'timer' => ['minutes' => 0, 'seconds' => 15]
        ];

        return view('dashboard', compact('data'));
    }

    public function riwayat()
    {
        // Example history rows (replace with DB retrieval)
        $rows = [
            ['tanggal' => '23-11-2025', 'mulai' => '11:30:17', 'selesai' => '11:30:40', 'bungkuk' => 1, 'status' => 'Normal'],
            ['tanggal' => '23-11-2025', 'mulai' => '11:33:15', 'selesai' => '11:33:38', 'bungkuk' => 0, 'status' => 'Normal'],
        ];

        return view('riwayat', compact('rows'));
    }
}
