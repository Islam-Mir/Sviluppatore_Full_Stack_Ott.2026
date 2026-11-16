@extends('layouts.app')
@section('title','Destinazioni')
@section('content')
<div class="d-flex justify-content-between align-items-center mb-4"><div><h1 class="h3 mb-1">Destinazioni</h1><p class="text-secondary mb-0">Gestione destinazioni con Laravel ed Eloquent</p></div>@if(auth()->user()->isManager())<a class="btn btn-primary" href="{{ route('destinazioni.create') }}">+ Nuovo</a>@endif</div>
<div class="card"><div class="card-body table-responsive"><table class="table table-hover"><thead><tr><th>Città</th><th>Paese</th><th>Prezzo</th><th>Posti liberi</th><th>Azioni</th></tr></thead><tbody>
@forelse($destinazioni as $destinazione)<tr><td>{{ $destinazione->citta }}</td><td>{{ $destinazione->paese }}</td><td>€ {{ number_format($destinazione->prezzo, 2, ',', '.') }}</td><td>{{ $destinazione->posti_liberi }}</td><td class="text-nowrap"><a class="btn btn-sm btn-outline-secondary" href="{{ route('destinazioni.show', $destinazione) }}">Dettagli</a> @if(auth()->user()->isManager())<a class="btn btn-sm btn-outline-primary" href="{{ route('destinazioni.edit', $destinazione) }}">Modifica</a> <form class="d-inline" method="POST" action="{{ route('destinazioni.destroy', $destinazione) }}" onsubmit="return confirm('Confermi eliminazione?')">@csrf @method('DELETE')<button class="btn btn-sm btn-outline-danger">Elimina</button></form>@endif</td></tr>
@empty<tr><td colspan="5" class="text-center py-4 text-muted">Nessun elemento presente.</td></tr>@endforelse
</tbody></table>{{ $destinazioni->links('pagination::bootstrap-5') }}</div></div>
@endsection
