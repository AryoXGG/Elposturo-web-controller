@extends('layouts.app')

@section('title', 'Riwayat')

@section('content')
    <h2 style="font-weight:700;">RIWAYAT POSTURE MONITORING</h2>

    <table class="table table-striped history-table">
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Jam mulai</th>
                <th>Jam selesai</th>
                <th>Bungkuk</th>
                <th>Status akhir</th>
            </tr>
        </thead>
        <tbody id="historyBody">
            <!-- Rows will be filled by JavaScript fetching /api/history or /api/riwayat -->
        </tbody>
    </table>

@endsection