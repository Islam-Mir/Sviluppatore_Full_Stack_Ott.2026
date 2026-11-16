<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('destinazioni', function (Blueprint $table) {
            $table->id();
            $table->string('citta', 100);
            $table->string('paese', 100);
            $table->decimal('prezzo', 10, 2);
            $table->date('data_partenza');
            $table->date('data_ritorno');
            $table->unsignedInteger('posti_disponibili'); // Capienza totale del viaggio.
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('destinazioni'); }
};
