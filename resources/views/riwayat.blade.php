@extends('layouts.app')

@section('title', 'Riwayat')

@section('content')
<div class="container-fluid py-4">
    <div class="mb-4">
        <h2 class="fw-bold text-dark m-0" style="font-family: sans-serif;">
            RIWAYAT DATA
        </h2>
    </div>

    <div class="card card-modern bg-white shadow-sm">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                    <tr>
                        <th class="py-4 ps-4 text-uppercase text-secondary small fw-bold border-0">Tanggal</th>
                        <th class="py-4 text-uppercase text-secondary small fw-bold border-0">Jam Mulai</th>
                        <th class="py-4 text-uppercase text-secondary small fw-bold border-0">Jam Selesai</th>
                        <th class="py-4 text-uppercase text-secondary small fw-bold border-0">Jml. Bungkuk</th>
                        <th class="py-4 pe-4 text-uppercase text-secondary small fw-bold border-0">Status Akhir</th>
                    </tr>
                </thead>
                <tbody id="historyBody" class="border-top-0">
                    </tbody>
            </table>
        </div>
        
       
    </div>
</div>
@endsection