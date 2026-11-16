<?php
namespace Database\Seeders;
use App\Models\User;
use App\Models\Cliente;
use App\Models\Destinazione;
use App\Models\Prenotazione;
use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder {
    public function run(): void {
        $this->call(DemoUsersSeeder::class);
        // Dati di esempio: php artisan db:seed
        $mario=Cliente::create(['nome'=>'Mario','cognome'=>'Rossi','email'=>'mario@example.test','telefono'=>'3331112222','nazione'=>'Italia']);
        $anna=Cliente::create(['nome'=>'Anna','cognome'=>'Bianchi','email'=>'anna@example.test','nazione'=>'Italia']);
        $parigi=Destinazione::create(['citta'=>'Parigi','paese'=>'Francia','prezzo'=>499.90,'data_partenza'=>'2027-05-10','data_ritorno'=>'2027-05-15','posti_disponibili'=>20]);
        Destinazione::create(['citta'=>'Tokyo','paese'=>'Giappone','prezzo'=>1890,'data_partenza'=>'2027-07-01','data_ritorno'=>'2027-07-12','posti_disponibili'=>12]);
        Prenotazione::create(['id_cliente'=>$mario->id,'id_destinazione'=>$parigi->id,'data_prenotazione'=>'2026-11-05','num_persone'=>2]);
        Prenotazione::create(['id_cliente'=>$anna->id,'id_destinazione'=>$parigi->id,'data_prenotazione'=>'2026-11-05','num_persone'=>1]);
    }
}
