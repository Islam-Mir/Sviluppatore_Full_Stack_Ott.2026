@extends('layouts.app')
@section('title','Accedi')
@section('content')
<div class="row justify-content-center"><div class="col-md-5"><div class="card"><div class="card-body p-4"><h1 class="h3 mb-3">Accesso Agenzia Viaggi</h1>
<form method="POST" action="{{ route('login.submit') }}">@csrf
<div class="mb-3"><label for="email" class="form-label">Email</label><input id="email" name="email" type="email" value="{{ old('email') }}" class="form-control" required autofocus autocomplete="username"></div>
<div class="mb-3"><label for="password" class="form-label">Password</label><input id="password" name="password" type="password" class="form-control" required autocomplete="current-password"></div>
<button class="btn btn-primary w-100">Accedi</button></form></div></div></div></div>
@endsection
