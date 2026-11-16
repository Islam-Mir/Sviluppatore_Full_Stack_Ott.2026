<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Cliente extends Model {
    protected $table = 'clienti';
    protected $fillable = ['nome','cognome','email','telefono','nazione'];
    public function prenotazioni(): HasMany { return $this->hasMany(Prenotazione::class, 'id_cliente'); }
}
