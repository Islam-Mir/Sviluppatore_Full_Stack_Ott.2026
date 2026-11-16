<?php
namespace App\Http\Controllers;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
class ClienteController extends Controller {
    public function index() { return view('clienti.index', ['clienti'=>Cliente::orderBy('cognome')->paginate(10)]); }
    public function create() { return view('clienti.form', ['cliente'=>new Cliente]); }
    private function regole(): array { return ['nome'=>'required|string|max:100','cognome'=>'required|string|max:100','email'=>'nullable|email|max:150','telefono'=>'nullable|string|max:50','nazione'=>'nullable|string|max:100']; }
    public function store(Request $request) { Cliente::create($request->validate($this->regole())); return redirect()->route('clienti.index')->with('success','Cliente inserito.'); }
    public function show(Cliente $cliente) { return view('clienti.show', compact('cliente')); }
    public function edit(Cliente $cliente) { return view('clienti.form', compact('cliente')); }
    public function update(Request $request, Cliente $cliente) { $cliente->update($request->validate($this->regole())); return redirect()->route('clienti.index')->with('success','Cliente aggiornato.'); }
    public function destroy(Cliente $cliente) {
        if ($cliente->prenotazioni()->exists()) return back()->with('error','Non puoi eliminare un cliente con prenotazioni.');
        $cliente->delete(); return redirect()->route('clienti.index')->with('success','Cliente eliminato.');
    }
}
