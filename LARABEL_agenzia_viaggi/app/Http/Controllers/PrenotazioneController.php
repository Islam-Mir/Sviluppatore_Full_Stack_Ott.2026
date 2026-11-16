<?php
namespace App\Http\Controllers;
use App\Models\Cliente;
use App\Models\Destinazione;
use App\Models\Prenotazione;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
class PrenotazioneController extends Controller {
    public function index() { return view('prenotazioni.index', ['prenotazioni'=>Prenotazione::with(['cliente','destinazione'])->latest()->paginate(10)]); }
    private function datiForm(): array { return ['clienti'=>Cliente::orderBy('cognome')->get(),'destinazioni'=>Destinazione::orderBy('data_partenza')->get()]; }
    public function create() { return view('prenotazioni.form', array_merge(['prenotazione'=>new Prenotazione],$this->datiForm())); }
    private function regole(): array { return ['id_cliente'=>'required|exists:clienti,id','id_destinazione'=>'required|exists:destinazioni,id','data_prenotazione'=>'required|date','num_persone'=>'required|integer|min:1']; }
    public function store(Request $request) { $data=$request->validate($this->regole()); $this->salva($data); return redirect()->route('prenotazioni.index')->with('success','Prenotazione creata.'); }
    public function show(Prenotazione $prenotazione) { return view('prenotazioni.show',['prenotazione'=>$prenotazione->load(['cliente','destinazione'])]); }
    public function edit(Prenotazione $prenotazione) { return view('prenotazioni.form', array_merge(compact('prenotazione'),$this->datiForm())); }
    public function update(Request $request, Prenotazione $prenotazione) { $data=$request->validate($this->regole()); $this->salva($data,$prenotazione); return redirect()->route('prenotazioni.index')->with('success','Prenotazione aggiornata.'); }
    private function salva(array $data, ?Prenotazione $prenotazione=null): void {
        // Transazione + lock evitano che due prenotazioni simultanee superino la capienza.
        DB::transaction(function () use ($data,$prenotazione) {
            $ids=collect([$data['id_destinazione'], $prenotazione?->id_destinazione])->filter()->unique()->sort()->values();
            $destinazioni=Destinazione::whereIn('id',$ids)->orderBy('id')->lockForUpdate()->get()->keyBy('id');
            $destinazione=$destinazioni->get((int)$data['id_destinazione']);
            if (!$destinazione) throw ValidationException::withMessages(['id_destinazione'=>'Destinazione non trovata.']);
            $occupati=(int)$destinazione->prenotazioni()->sum('num_persone');
            if ($prenotazione && (int)$prenotazione->id_destinazione===(int)$data['id_destinazione']) $occupati-=$prenotazione->num_persone;
            if ($occupati+$data['num_persone']>$destinazione->posti_disponibili) throw ValidationException::withMessages(['num_persone'=>'Posti insufficienti: disponibili '.max(0,$destinazione->posti_disponibili-$occupati).'.']);
            if ($prenotazione) $prenotazione->update($data); else Prenotazione::create($data);
        });
    }
    public function destroy(Prenotazione $prenotazione) { $prenotazione->delete(); return redirect()->route('prenotazioni.index')->with('success','Prenotazione eliminata.'); }
}
