@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex align-items-center mb-4">
        <div>
            <h2 class="fw-bold text-dark m-0" style="font-family: sans-serif;">
                MONITORING POSTUR
            </h2>
            <p class="text-muted small m-0">Dashboard Monitoring Real-time</p>
        </div>
    </div>

    <div class="row g-4 mb-4">
        <div class="col-md-6">
            <div class="card card-modern card-gradient-blue">
                <div class="card-body p-4 position-relative z-1">
                    <div class="d-flex align-items-center mb-3">
                        <div class="bg-white bg-opacity-25 rounded-circle p-2 me-2">
                            <i class="bi bi-person-check-fill"></i>
                        </div>
                        <span class="text-uppercase fw-bold small opacity-75">Status Postur</span>
                    </div>
                    <div id="statusValue" class="display-4 fw-bold">...</div>
                    <p class="opacity-75 small mb-0 mt-2">Menunggu data sensor</p>
                </div>
                <div class="bg-circle-1"></div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="card card-modern card-gradient-purple">
                <div class="card-body p-4 position-relative z-1">
                    <div class="d-flex align-items-center mb-3">
                        <div class="bg-white bg-opacity-25 rounded-circle p-2 me-2">
                            <i class="bi bi-speedometer2"></i>
                        </div>
                        <span class="text-uppercase fw-bold small opacity-75">Sudut Kemiringan</span>
                    </div>
                    <div id="pressureValue" class="display-4 fw-bold">0°</div>
                    <p class="opacity-75 small mb-0 mt-2">Derajat kemiringan punggung</p>
                </div>
                <div class="bg-circle-2"></div>
            </div>
        </div>
    </div>

    <div class="card card-modern bg-white shadow-sm">
        <div class="card-body p-4">
            <h5 class="fw-bold text-dark mb-4">
                <i class="bi bi-clock me-2"></i>Pengaturan Timer
            </h5>
            
            <div class="row align-items-end g-3">
                <div class="col-auto text-center">
                    <label class="form-label small fw-bold text-muted">MENIT</label>
                    <input id="minutesInput" type="number" value="0" class="form-control input-timer">
                </div>
                
                <div class="col-auto text-center">
                    <label class="form-label small fw-bold text-muted">DETIK</label>
                    <input id="secondsInput" type="number" value="15" class="form-control input-timer">
                </div>

                <div class="col-auto pb-1">
                    <button id="sendTimer" class="btn btn-primary btn-rounded text-white">
                        Set Timer
                    </button>
                    <button id="resetBtn" class="btn btn-light text-muted btn-rounded ms-2">
                        Reset
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection