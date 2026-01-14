@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
    <h2 style="font-weight:700;">POSTURE MONITORING</h2>

    <div class="row g-3 mb-3">
        <div class="col-md-4">
            <div class="card p-3">
                <div class="text-muted small">STATUS POSTUR</div>
                <div id="statusValue" class="h5 mt-2">—</div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card p-3">
                <div class="text-muted small">DERAJAT POSTUR</div>
                <div id="pressureValue" class="h5 mt-2">—°</div>
            </div>
        </div>
    </div>

    <div class="card p-3">
        <h5 class="mb-3">ATUR TIMER</h5>
        <div class="row g-2 align-items-center">
            <div class="col-auto">
                <label class="form-label">Menit</label>
                <input id="minutesInput" type="number" name="minutes" value="0" class="form-control form-control-sm w-auto">
            </div>
            <div class="col-auto">
                <label class="form-label">Detik</label>
                <input id="secondsInput" type="number" name="seconds" value="15"
                    class="form-control form-control-sm w-auto">
            </div>
            <div class="col-auto mt-3">
                <button id="sendTimer" class="btn btn-primary">Kirim Timer</button>
                <button id="resetBtn" class="btn btn-secondary ms-2">Reset</button>
            </div>
        </div>
    </div>

@endsection