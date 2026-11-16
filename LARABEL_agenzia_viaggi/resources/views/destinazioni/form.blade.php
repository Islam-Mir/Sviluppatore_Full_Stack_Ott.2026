@extends('layouts.app')
@section('title','Destinazione')
@section('content')
@php($modifica = $destinazione->exists)
<h1 class="h3 mb-4">{{ $modifica ? 'Modifica destinazione' : 'Nuova destinazione' }}</h1>
<div class="card"><div class="card-body"><form method="POST" action="{{ $modifica ? route('destinazioni.update',$destinazione) : route('destinazioni.store') }}">@csrf @if($modifica) @method('PUT') @endif
<div class="row g-3">
@foreach(['citta'=>'Città','paese'=>'Paese','prezzo'=>'Prezzo (€)','data_partenza'=>'Data partenza','data_ritorno'=>'Data ritorno','posti_disponibili'=>'Capienza totale'] as $campo=>$etichetta)
<div class="col-md-6"><label for="{{ $campo }}" class="form-label">{{ $etichetta }}</label>
<input class="form-control" id="{{ $campo }}" name="{{ $campo }}" type="{{ str_starts_with($campo,'data_') ? 'date' : (in_array($campo,['prezzo','posti_disponibili']) ? 'number' : 'text') }}" @if($campo==='prezzo') step="0.01" min="0" @elseif($campo==='posti_disponibili') min="0" @endif value="{{ old($campo, str_starts_with($campo,'data_') ? $destinazione->$campo?->format('Y-m-d') : $destinazione->$campo) }}" required></div>
@endforeach
</div><p class="small text-secondary mt-3">La capienza totale è il numero massimo di posti; i posti liberi vengono calcolati sottraendo le prenotazioni.</p><button class="btn btn-primary">Salva</button> <a class="btn btn-outline-secondary" href="{{ route('destinazioni.index') }}">Annulla</a></form></div></div>
@endsection
