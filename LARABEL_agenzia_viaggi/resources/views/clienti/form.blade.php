@extends('layouts.app')
@section('title','Cliente')
@section('content')
@php($modifica = $cliente->exists)
<h1 class="h3 mb-4">{{ $modifica ? 'Modifica cliente' : 'Nuovo cliente' }}</h1>
<div class="card"><div class="card-body"><form method="POST" action="{{ $modifica ? route('clienti.update',$cliente) : route('clienti.store') }}">@csrf @if($modifica) @method('PUT') @endif
<div class="row g-3">
@foreach(['nome'=>'Nome','cognome'=>'Cognome','email'=>'Email','telefono'=>'Telefono','nazione'=>'Nazione'] as $campo=>$etichetta)
<div class="col-md-6"><label class="form-label" for="{{ $campo }}">{{ $etichetta }}</label><input class="form-control" id="{{ $campo }}" name="{{ $campo }}" type="{{ $campo==='email' ? 'email' : 'text' }}" value="{{ old($campo,$cliente->$campo) }}" @if(in_array($campo,['nome','cognome'])) required @endif></div>
@endforeach
</div><div class="mt-4"><button class="btn btn-primary">Salva</button> <a class="btn btn-outline-secondary" href="{{ route('clienti.index') }}">Annulla</a></div></form></div></div>
@endsection
