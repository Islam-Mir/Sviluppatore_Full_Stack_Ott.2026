<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('prenotazioni', function (Blueprint $table) {
            $table->id();
            // Le foreign key impediscono prenotazioni verso clienti o viaggi inesistenti.
            $table->foreignId('id_cliente')->constrained('clienti')->restrictOnDelete();
            $table->foreignId('id_destinazione')->constrained('destinazioni')->restrictOnDelete();
            $table->date('data_prenotazione');
            $table->unsignedInteger('num_persone');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('prenotazioni'); }
};
