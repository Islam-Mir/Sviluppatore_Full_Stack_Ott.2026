{{-- Componente Chatbot Fluttuante Agenzia Viaggi --}}
<div class="chatbot-launcher-container" id="chatbot-launcher-wrapper">
    <!-- Prompt fisso visibile ("Chatta con l'IA ✈️") -->
    <div id="chatbot-prompt-badge" class="chatbot-prompt-badge" role="button" title="Apri la chat">
        <span class="badge-icon">✈️</span>
        <div class="badge-text">
            <span class="badge-title">Assistente Viaggi IA</span>
            <span class="badge-subtitle">Chiedimi info su mete, prezzi e date!</span>
        </div>
        <button id="chatbot-badge-close" class="badge-close" type="button" title="Chiudi notifica" aria-label="Chiudi notifica">&times;</button>
    </div>

    <!-- Pulsante Circolare con logo bot.png -->
    <button id="chatbot-launcher-btn" class="chatbot-launcher-btn" type="button" title="Apri ViaggiBot AI" aria-label="Apri ViaggiBot AI">
        <img src="{{ asset('images/chatbot/bot.png') }}" alt="ViaggiBot" class="launcher-avatar">
        <span class="launcher-close-icon" aria-hidden="true">&times;</span>
        <span class="chatbot-online-indicator" title="Online"></span>
    </button>
</div>

<!-- Finestra Chat Fluttuante, Ridimensionabile e Fullscreen -->
<div id="chatbot-window" class="chatbot-window" role="dialog" aria-modal="false" aria-label="Finestra ViaggiBot">
    <!-- Maniglie di ridimensionamento interattive (Top, Left, Top-Left Corner) -->
    <div class="chatbot-resize-corner" title="Trascina per ridimensionare larghezza e altezza"></div>
    <div class="chatbot-resize-left" title="Trascina per regolare la larghezza"></div>
    <div class="chatbot-resize-top" title="Trascina per regolare l'altezza"></div>

    <!-- Header superiore -->
    <div class="chatbot-header">
        <div class="chatbot-header-info">
            <div class="chatbot-header-avatar">
                <img src="{{ asset('images/chatbot/bot.png') }}" alt="ViaggiBot">
            </div>
            <div class="chatbot-header-details">
                <div class="chatbot-header-title-row">
                    <span class="chatbot-header-title">ViaggiBot</span>
                    <span class="chatbot-header-badge">AI Assist ✈️</span>
                </div>
                <div class="chatbot-header-status">
                    <span class="chatbot-status-dot"></span>
                    <span class="chatbot-status-text">online • Agenzia Viaggi</span>
                </div>
            </div>
        </div>

        <!-- Azioni Header -->
        <div class="chatbot-header-actions">
            <!-- Dropdown Esporta (.txt, .csv, .pdf) -->
            <div class="chatbot-export-wrapper">
                <button type="button" id="chatbot-export-btn" class="chatbot-export-btn" title="Esporta la conversazione">
                    <span>Esporta</span>
                    <span style="font-size: 10px;">▼</span>
                </button>
                <div id="chatbot-export-menu" class="chatbot-export-menu">
                    <button type="button" class="chatbot-export-item" onclick="ChatbotExport.exportTXT()">
                        <span>📄</span>
                        <span>Esporta in <strong>.TXT</strong></span>
                    </button>
                    <button type="button" class="chatbot-export-item" onclick="ChatbotExport.exportCSV()">
                        <span>📊</span>
                        <span>Esporta in <strong>.CSV</strong></span>
                    </button>
                    <button type="button" class="chatbot-export-item" onclick="ChatbotExport.exportPDF()">
                        <span>📑</span>
                        <span>Esporta / Stampa <strong>.PDF</strong></span>
                    </button>
                </div>
            </div>

            <!-- Pulsante Schermo Intero (Fullscreen) -->
            <button type="button" id="chatbot-fullscreen-btn" class="chatbot-action-btn" title="Schermo intero" aria-label="Schermo intero">
                <span class="material-icon-fs" style="font-size: 15px; font-weight: bold;">&#x26F6;</span>
            </button>

            <!-- Pulsante Chiudi finestra -->
            <button type="button" id="chatbot-close-btn" class="chatbot-action-btn" title="Chiudi chat" aria-label="Chiudi chat">
                <span style="font-size: 19px; line-height: 1;">&times;</span>
            </button>
        </div>
    </div>

    <!-- Area Messaggi Interna Scrollabile -->
    <div id="chatbot-messages" class="chatbot-messages-container"></div>

    <!-- Footer con barra di input -->
    <div class="chatbot-footer">
        <div class="chatbot-input-bar">
            <input type="text" id="chatbot-input" class="chatbot-input-field" placeholder="Chiedi a ViaggiBot sulla tua prossima vacanza..." autocomplete="off">
            <button type="button" id="chatbot-mic-btn" class="chatbot-mic-btn" title="Messaggio vocale" aria-label="Messaggio vocale">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
            </button>
            <button type="button" id="chatbot-send-btn" class="chatbot-send-btn" title="Invia messaggio" aria-label="Invia messaggio">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="transform: rotate(-30deg) translate(1px, -1px);">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
            </button>
        </div>
        <div class="chatbot-footer-subtext">
            <span>✈️ Agenzia Viaggi Hub</span>
            <span>Supporto & Disponibilità in tempo reale</span>
        </div>
    </div>
</div>

