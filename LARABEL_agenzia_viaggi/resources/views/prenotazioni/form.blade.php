@extends('layouts.app')
@section('title','Prenotazione')
@section('content')
@php($modifica = $prenotazione->exists)
<h1 class="h3 mb-4">{{ $modifica ? 'Modifica prenotazione' : 'Nuova prenotazione' }}</h1>
<div class="card"><div class="card-body"><form method="POST" action="{{ $modifica ? route('prenotazioni.update',$prenotazione) : route('prenotazioni.store') }}">@csrf @if($modifica) @method('PUT') @endif
<div class="row g-3"><div class="col-md-6"><label class="form-label">Cliente</label><select name="id_cliente" class="form-select" required><option value="">Seleziona un cliente</option>@foreach($clienti as $cliente)<option value="{{ $cliente->id }}" @selected(old('id_cliente',$prenotazione->id_cliente)==$cliente->id)>{{ $cliente->cognome }} {{ $cliente->nome }}</option>@endforeach</select></div>
<div class="col-md-6"><label class="form-label">Destinazione</label><select name="id_destinazione" class="form-select" required><option value="">Seleziona una destinazione</option>@foreach($destinazioni as $destinazione)<option value="{{ $destinazione->id }}" @selected(old('id_destinazione',$prenotazione->id_destinazione)==$destinazione->id)>{{ $destinazione->citta }} — {{ $destinazione->paese }} ({{ $destinazione->posti_liberi }} liberi)</option>@endforeach</select></div>
<div class="col-md-6"><label class="form-label">Data prenotazione</label><input class="form-control" type="date" name="data_prenotazione" value="{{ old('data_prenotazione',$prenotazione->data_prenotazione?->format('Y-m-d') ?? now()->format('Y-m-d')) }}" required></div>
<div class="col-md-6"><label class="form-label">Numero persone</label><input class="form-control" type="number" name="num_persone" min="1" value="{{ old('num_persone',$prenotazione->num_persone ?? 1) }}" required></div></div>
<p class="small text-secondary mt-3">Il server verifica la disponibilità dei posti prima di salvare.</p><button class="btn btn-primary">Salva</button> <a class="btn btn-outline-secondary" href="{{ route('prenotazioni.index') }}">Annulla</a></form></div></div>
@endsection
