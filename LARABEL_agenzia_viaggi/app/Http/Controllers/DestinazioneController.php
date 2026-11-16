<?php
namespace App\Http\Controllers;
use App\Models\Destinazione;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
class DestinazioneController extends Controller {
    public function index() { return view('destinazioni.index', ['destinazioni'=>Destinazione::orderBy('data_partenza')->paginate(10)]); }
    public function create() { return view('destinazioni.form', ['destinazione'=>new Destinazione]); }
    private function regole(): array { return ['citta'=>'required|string|max:100','paese'=>'required|string|max:100','prezzo'=>'required|numeric|min:0','data_partenza'=>'required|date','data_ritorno'=>'required|date|after_or_equal:data_partenza','posti_disponibili'=>'required|integer|min:0']; }
    public function store(Request $request) { Destinazione::create($request->validate($this->regole())); return redirect()->route('destinazioni.index')->with('success','Destinazione inserita.'); }
    public function show(Destinazione $destinazione) { return view('destinazioni.show', compact('destinazione')); }
    public function edit(Destinazione $destinazione) { return view('destinazioni.form', compact('destinazione')); }
    public function update(Request $request, Destinazione $destinazione) {
        $data=$request->validate($this->regole());
        if ($data['posti_disponibili'] < $destinazione->prenotazioni()->sum('num_persone')) throw ValidationException::withMessages(['posti_disponibili'=>'La capienza non può essere inferiore ai posti già prenotati.']);
        $destinazione->update($data); return redirect()->route('destinazioni.index')->with('success','Destinazione aggiornata.');
    }
    public function destroy(Destinazione $destinazione) {
        if ($destinazione->prenotazioni()->exists()) return back()->with('error','Non puoi eliminare una destinazione con prenotazioni.');
        $destinazione->delete(); return redirect()->route('destinazioni.index')->with('success','Destinazione eliminata.');
    }
}
