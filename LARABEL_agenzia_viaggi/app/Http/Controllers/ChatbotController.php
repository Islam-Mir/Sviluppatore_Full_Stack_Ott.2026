<?php

namespace App\Http\Controllers;

use App\Models\Destinazione;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class ChatbotController extends Controller
{
    /**
     * Risponde alle domande dell'utente integrando i dati reali del database di Agenzia Viaggi.
     */
    public function sendMessage(Request $request): JsonResponse
    {
        $message = trim((string) $request->input('message', ''));
        if ($message === '') {
            return response()->json([
                'reply' => 'Non ho ricevuto alcun messaggio. Come posso aiutarti?',
                'suggestions' => ['Destinazioni', 'Prezzi', 'Come prenotare']
            ]);
        }

        $reply = $this->elaboraRisposta($message);

        return response()->json($reply);
    }

    /**
     * Elabora una risposta intelligente in base ai dati dell'agenzia di viaggi.
     */
    private function elaboraRisposta(string $userPrompt): array
    {
        $lower = mb_strtolower($userPrompt);
        $user = Auth::user();

        // 1. Saluti iniziali
        if (preg_match('/\b(ciao|buongiorno|buonasera|salve|hey|hello|hi)\b/i', $lower)) {
            $saluto = $user ? "Ciao <strong>" . e($user->name) . "</strong>!" : "Ciao e benvenuto!";
            return [
                'reply' => "{$saluto} Sono <strong>ViaggiBot</strong>, il tuo consulente virtuale di <strong>Agenzia Viaggi</strong>. ✈️<br><br>Posso aiutarti a trovare la tua prossima vacanza, verificare le disponibilità in tempo reale, controllare i prezzi o spiegarti come funziona la prenotazione. Cosa ti piacerebbe scoprire oggi?",
                'suggestions' => ['Quali destinazioni ci sono?', 'Mete più economiche', 'Come prenotare?', 'Orari e contatti']
            ];
        }

        // 2. Documenti, passaporti, bagagli
        if (str_contains($lower, 'document') || str_contains($lower, 'passaport') || str_contains($lower, 'carta') || str_contains($lower, 'bagagl') || str_contains($lower, 'valig')) {
            return [
                'reply' => "📋 <strong>Documenti e Bagagli:</strong><br><br>" .
                           "• <strong>Viaggi UE:</strong> È sufficiente una Carta d'Identità valida per l'espatrio in corso di validità.<br>" .
                           "• <strong>Viaggi Extra-UE:</strong> È necessario il Passaporto con validità residua di almeno 6 mesi. Alcuni paesi richiedono visto elettronico (es. ESTA/ETA).<br>" .
                           "• <strong>Bagaglio:</strong> Tutti i nostri pacchetti includono bagaglio a mano (max 8kg) e un bagaglio da stiva fino a 20kg per persona.",
                'suggestions' => ['Destinazioni disponibili', 'Assicurazione viaggio', 'Come prenotare?']
            ];
        }

        // 3. Orari, sede e contatti
        if (str_contains($lower, 'orari') || str_contains($lower, 'contatt') || str_contains($lower, 'telefono') || str_contains($lower, 'sede') || str_contains($lower, 'dove siete') || str_contains($lower, 'apert')) {
            return [
                'reply' => "📍 <strong>Agenzia Viaggi - Info & Contatti:</strong><br><br>" .
                           "• <strong>Orari ufficio:</strong> Lunedì - Venerdì: 09:00 - 19:30 | Sabato: 09:30 - 13:00<br>" .
                           "• <strong>Assistenza Telefonica:</strong> +39 06 12345678<br>" .
                           "• <strong>Email:</strong> info@agenziaviaggi.example.com<br>" .
                           "• <strong>Emergenze Viaggiatori 24/7:</strong> Assistenza sempre attiva per i clienti in viaggio.",
                'suggestions' => ['Quali mete ci sono?', 'Offerte del mese']
            ];
        }

        // 4. Come prenotare / Gestione prenotazioni
        if (str_contains($lower, 'prenot') || str_contains($lower, 'acquist') || str_contains($lower, 'blocca') || str_contains($lower, 'ferm') || str_contains($lower, 'riserv')) {
            $linkDestinazioni = route('destinazioni.index');
            $guida = "Per prenotare un viaggio puoi:<br>" .
                     "1. Scegliere la meta desiderata dalla sezione <a href=\"{$linkDestinazioni}\" class=\"text-primary text-decoration-underline fw-bold\">Destinazioni</a>.<br>" .
                     "2. Se sei un <strong>Manager</strong> (Admin/Superadmin), puoi inserire direttamente la prenotazione tramite il modulo dedicato in <strong>Prenotazioni</strong>.<br>" .
                     "3. Se sei un cliente o visitatore, puoi contattare la nostra sede per bloccare i posti telefonicamente o via email.";
            return [
                'reply' => $guida,
                'suggestions' => ['Quali destinazioni ci sono?', 'Documenti necessari', 'Mete più economiche']
            ];
        }

        // 5. Ruoli e permessi nella piattaforma
        if (str_contains($lower, 'ruol') || str_contains($lower, 'admin') || str_contains($lower, 'permess') || str_contains($lower, 'superadmin') || str_contains($lower, 'account')) {
            return [
                'reply' => "La piattaforma prevede tre livelli di accesso:<br>" .
                           "• <strong>Guest:</strong> visualizza il catalogo delle destinazioni e le disponibilità.<br>" .
                           "• <strong>Admin:</strong> gestione completa di destinazioni, anagrafica clienti e prenotazioni.<br>" .
                           "• <strong>Superadmin:</strong> tutti i privilegi di Admin + creazione e modifica ruoli degli utenti di sistema.",
                'suggestions' => ['Destinazioni', 'Come prenotare?']
            ];
        }

        // 6. Richiesta mete più economiche o offerte (query DB protetta da try/catch)
        if (str_contains($lower, 'economic') || str_contains($lower, 'cost') || str_contains($lower, 'meno') || str_contains($lower, 'prezz') || str_contains($lower, 'offert') || str_contains($lower, 'low cost')) {
            try {
                $destinazioni = Destinazione::orderBy('prezzo', 'asc')->take(3)->get();
                if ($destinazioni->isNotEmpty()) {
                    $elenco = "";
                    foreach ($destinazioni as $d) {
                        $prezzo = number_format($d->prezzo, 2, ',', '.');
                        $dataPartenza = $d->data_partenza ? $d->data_partenza->format('d/m/Y') : 'Data flessibile';
                        $posti = $d->posti_liberi;
                        $elenco .= "<li><strong>" . e($d->citta) . " (" . e($d->paese) . ")</strong>: da <span class=\"text-success fw-bold\">€ {$prezzo}</span> • Partenza il {$dataPartenza} ({$posti} posti liberi)</li>";
                    }
                    return [
                        'reply' => "Ecco i nostri viaggi più convenienti con posti disponibili:<ul class=\"mt-2 mb-2 ps-3\">{$elenco}</ul>Vorresti maggiori informazioni su una di queste mete?",
                        'suggestions' => $destinazioni->pluck('citta')->toArray()
                    ];
                }
            } catch (Throwable $e) {
                // Fallback se DB temporaneamente non disponibile
                return [
                    'reply' => "I nostri viaggi partono da tariffe vantaggiose con prezzi a partire da <strong>€ 149,00</strong> a persona, inclusi voli e hotel selezionati! Visita la pagina <a href=\"" . route('destinazioni.index') . "\" class=\"text-primary text-decoration-underline fw-bold\">Destinazioni</a> per la lista aggiornata.",
                    'suggestions' => ['Come prenotare?', 'Documenti necessari', 'Orari e contatti']
                ];
            }
        }

        // 7. Ricerca per destinazione o paese specifico (query DB protetta)
        try {
            $tutte = Destinazione::all();
            foreach ($tutte as $d) {
                $cittaLower = mb_strtolower($d->citta);
                $paeseLower = mb_strtolower($d->paese);

                if (str_contains($lower, $cittaLower) || str_contains($lower, $paeseLower)) {
                    $prezzo = number_format($d->prezzo, 2, ',', '.');
                    $partenza = $d->data_partenza ? $d->data_partenza->format('d/m/Y') : 'N/D';
                    $ritorno = $d->data_ritorno ? $d->data_ritorno->format('d/m/Y') : 'N/D';
                    $posti = $d->posti_liberi;
                    $statoPosti = $posti > 0 
                        ? "<span class=\"badge bg-success\">{$posti} posti liberi</span>" 
                        : "<span class=\"badge bg-danger\">Al completo</span>";

                    $linkDettaglio = route('destinazioni.show', $d);

                    return [
                        'reply' => "🌍 <strong>" . e($d->citta) . ", " . e($d->paese) . "</strong><br><br>" .
                                   "• <strong>Prezzo:</strong> € {$prezzo} a persona<br>" .
                                   "• <strong>Periodo:</strong> dal {$partenza} al {$ritorno}<br>" .
                                   "• <strong>Disponibilità:</strong> {$statoPosti}<br><br>" .
                                   "👉 <a href=\"{$linkDettaglio}\" class=\"text-primary text-decoration-underline fw-bold\">Visualizza scheda della destinazione</a>",
                        'suggestions' => ['Come prenotare?', 'Mete più economiche', 'Documenti e bagagli']
                    ];
                }
            }
        } catch (Throwable $e) {
            // Ignora errore DB e procedi
        }

        // 8. Richiesta elenco destinazioni generali (query DB protetta)
        if (str_contains($lower, 'destinazion') || str_contains($lower, 'dove') || str_contains($lower, 'viagg') || str_contains($lower, 'mete') || str_contains($lower, 'catalogo') || str_contains($lower, 'elenco')) {
            try {
                $destinazioni = Destinazione::orderBy('data_partenza')->take(5)->get();
                if ($destinazioni->isNotEmpty()) {
                    $elenco = "";
                    foreach ($destinazioni as $d) {
                        $prezzo = number_format($d->prezzo, 2, ',', '.');
                        $data = $d->data_partenza ? $d->data_partenza->format('d/m/Y') : '';
                        $elenco .= "<li><strong>" . e($d->citta) . "</strong> (" . e($d->paese) . ") — € {$prezzo} (partenza: {$data}, {$d->posti_liberi} posti)</li>";
                    }
                    return [
                        'reply' => "Attualmente nel catalogo di <strong>Agenzia Viaggi</strong> abbiamo splendide mete in programma:<ul class=\"mt-2 mb-2 ps-3\">{$elenco}</ul>Puoi chiedermi dettagli su qualunque città o paese!",
                        'suggestions' => ['Offerte economiche', 'Come prenotare?', 'Posti disponibili']
                    ];
                }
            } catch (Throwable $e) {
                // Fallback statico
            }

            return [
                'reply' => "Nel nostro catalogo puoi trovare mete culturali, tour organizzati e vacanze relax in tutta Europa e nel mondo. Consulta l'elenco completo nella sezione <a href=\"" . route('destinazioni.index') . "\" class=\"text-primary text-decoration-underline fw-bold\">Destinazioni</a>!",
                'suggestions' => ['Mete più economiche', 'Come prenotare?', 'Orari e contatti']
            ];
        }

        // Risposta generale di default
        return [
            'reply' => "Ottima domanda! Posso darti informazioni dettagliate su tutte le nostre destinazioni, date di partenza, disponibilità di posti liberi e preventivi su misura.<br><br>Puoi provare a chiedermi ad esempio: <em>\"Quali sono i viaggi per Roma?\"</em> oppure <em>\"Mostrami le mete più economiche\"</em>.",
            'suggestions' => ['Quali destinazioni ci sono?', 'Mete più economiche', 'Come prenotare?', 'Contatti e orari']
        ];
    }
}
