<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Prenotazione extends Model {
    protected $table = 'prenotazioni';
    protected $fillable = ['id_cliente','id_destinazione','data_prenotazione','num_persone'];
    protected $casts = ['data_prenotazione'=>'date'];
    // belongsTo() rappresenta il lato "molti" della relazione uno-a-molti.
    public function cliente(): BelongsTo { return $this->belongsTo(Cliente::class, 'id_cliente'); }
    public function destinazione(): BelongsTo { return $this->belongsTo(Destinazione::class, 'id_destinazione'); }
}
