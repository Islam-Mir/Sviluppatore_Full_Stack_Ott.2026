@extends('layouts.app')
@section('title','Clienti')
@section('content')
<div class="d-flex justify-content-between align-items-center mb-4"><div><h1 class="h3 mb-1">Clienti</h1><p class="text-secondary mb-0">Gestione clienti con Laravel ed Eloquent</p></div>@if(auth()->user()->isManager())<a class="btn btn-primary" href="{{ route('clienti.create') }}">+ Nuovo</a>@endif</div>
<div class="card"><div class="card-body table-responsive"><table class="table table-hover"><thead><tr><th>Nome</th><th>Cognome</th><th>Email</th><th>Nazione</th><th>Azioni</th></tr></thead><tbody>
@forelse($clienti as $cliente)<tr><td>{{ $cliente->nome }}</td><td>{{ $cliente->cognome }}</td><td>{{ $cliente->email }}</td><td>{{ $cliente->nazione }}</td><td class="text-nowrap"><a class="btn btn-sm btn-outline-secondary" href="{{ route('clienti.show', $cliente) }}">Dettagli</a> @if(auth()->user()->isManager())<a class="btn btn-sm btn-outline-primary" href="{{ route('clienti.edit', $cliente) }}">Modifica</a> <form class="d-inline" method="POST" action="{{ route('clienti.destroy', $cliente) }}" onsubmit="return confirm('Confermi eliminazione?')">@csrf @method('DELETE')<button class="btn btn-sm btn-outline-danger">Elimina</button></form>@endif</td></tr>
@empty<tr><td colspan="5" class="text-center py-4 text-muted">Nessun elemento presente.</td></tr>@endforelse
</tbody></table>{{ $clienti->links('pagination::bootstrap-5') }}</div></div>
@endsection
