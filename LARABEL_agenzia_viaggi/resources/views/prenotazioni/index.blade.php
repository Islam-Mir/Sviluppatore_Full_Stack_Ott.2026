@extends('layouts.app')
@section('title','Prenotazioni')
@section('content')
<div class="d-flex justify-content-between align-items-center mb-4"><div><h1 class="h3 mb-1">Prenotazioni</h1><p class="text-secondary mb-0">Gestione prenotazioni con Laravel ed Eloquent</p></div>@if(auth()->user()->isManager())<a class="btn btn-primary" href="{{ route('prenotazioni.create') }}">+ Nuovo</a>@endif</div>
<div class="card"><div class="card-body table-responsive"><table class="table table-hover"><thead><tr><th>Cliente</th><th>Destinazione</th><th>Data</th><th>Persone</th><th>Azioni</th></tr></thead><tbody>
@forelse($prenotazioni as $prenotazione)<tr><td>{{ $prenotazione->cliente->nome }} {{ $prenotazione->cliente->cognome }}</td><td>{{ $prenotazione->destinazione->citta }}</td><td>{{ $prenotazione->data_prenotazione?->format('d/m/Y') ?? 'N/D' }}</td><td>{{ $prenotazione->num_persone }}</td><td class="text-nowrap"><a class="btn btn-sm btn-outline-secondary" href="{{ route('prenotazioni.show', $prenotazione) }}">Dettagli</a> @if(auth()->user()->isManager())<a class="btn btn-sm btn-outline-primary" href="{{ route('prenotazioni.edit', $prenotazione) }}">Modifica</a> <form class="d-inline" method="POST" action="{{ route('prenotazioni.destroy', $prenotazione) }}" onsubmit="return confirm('Confermi eliminazione?')">@csrf @method('DELETE')<button class="btn btn-sm btn-outline-danger">Elimina</button></form>@endif</td></tr>
@empty<tr><td colspan="5" class="text-center py-4 text-muted">Nessun elemento presente.</td></tr>@endforelse
</tbody></table>{{ $prenotazioni->links('pagination::bootstrap-5') }}</div></div>
@endsection
