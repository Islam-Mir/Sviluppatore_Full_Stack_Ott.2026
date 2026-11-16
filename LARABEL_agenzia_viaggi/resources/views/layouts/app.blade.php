<!doctype html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title','Agenzia Viaggi') · Laravel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/chatbot.css') }}">
    <style>
        body { background: #f5f7fb; }
        .navbar { background: #142c49; }
        .navbar-brand { font-weight: 750; }
        .card { border: 0; box-shadow: 0 4px 18px #12223b12; border-radius: 14px; }
        .btn { border-radius: 8px; }
        .table { vertical-align: middle; }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark mb-4">
        <div class="container">
            <a class="navbar-brand" href="{{ route('destinazioni.index') }}">✈ Agenzia Viaggi</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="menu">
                <div class="navbar-nav ms-auto">
                    @auth
                        <a class="nav-link" href="{{ route('destinazioni.index') }}">Destinazioni</a>
                        @if(auth()->user()->isManager())
                            <a class="nav-link" href="{{ route('clienti.index') }}">Clienti</a>
                            <a class="nav-link" href="{{ route('prenotazioni.index') }}">Prenotazioni</a>
                        @endif
                        @if(auth()->user()->isSuperadmin())
                            <a class="nav-link" href="{{ route('users.index') }}">Utenti</a>
                        @endif
                        <span class="navbar-text ms-lg-3 me-lg-2">{{ auth()->user()->name }} ({{ auth()->user()->role }})</span>
                        <form method="POST" action="{{ route('logout') }}" class="d-flex align-items-center">
                            @csrf
                            <button class="btn btn-sm btn-outline-light">Esci</button>
                        </form>
                    @endauth
                </div>
            </div>
        </div>
    </nav>

    <main class="container pb-5">
        @if(session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @if(session('error'))
            <div class="alert alert-danger">{{ session('error') }}</div>
        @endif
        @if($errors->any())
            <div class="alert alert-danger">
                <strong>Controlla i campi:</strong>
                <ul class="mb-0">
                    @foreach($errors->all() as $errore)
                        <li>{{ $errore }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @yield('content')
    </main>

    <!-- Componente Chatbot AI Fluttuante -->
    @include('components.chatbot')

    <!-- Script Bootstrap & Moduli Chatbot -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('js/chatbot/chat-state.js') }}"></script>
    <script src="{{ asset('js/chatbot/chat-ui.js') }}"></script>
    <script src="{{ asset('js/chatbot/chat-window.js') }}"></script>
    <script src="{{ asset('js/chatbot/chat-export.js') }}"></script>
    <script src="{{ asset('js/chatbot/chat-api.js') }}"></script>
    <script src="{{ asset('js/chatbot/chatbot.js') }}"></script>
</body>
</html>
