<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Destinazione extends Model {
    protected $table = 'destinazioni';
    protected $fillable = ['citta','paese','prezzo','data_partenza','data_ritorno','posti_disponibili'];
    protected $casts = ['data_partenza'=>'date','data_ritorno'=>'date','prezzo'=>'decimal:2'];
    public function prenotazioni(): HasMany { return $this->hasMany(Prenotazione::class, 'id_destinazione'); }
    // Disponibilità = capienza meno posti già prenotati.
    public function getPostiLiberiAttribute(): int {
        return max(0, $this->posti_disponibili - (int) $this->prenotazioni()->sum('num_persone'));
    }
}
