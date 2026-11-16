/**
 * Chatbot Agenzia Viaggi - chatbot.js
 * Controller principale ed Entry-Point per l'inizializzazione del componente.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inizializza interfaccia e cronologia
    if (window.ChatbotUI) {
        window.ChatbotUI.renderChat();
    }

    // 2. Inizializza controlli finestra e ridimensionamento
    if (window.ChatbotWindow) {
        window.ChatbotWindow.init();
    }

    // 3. Inizializza esportazioni (.txt, .csv, .pdf)
    if (window.ChatbotExport) {
        window.ChatbotExport.init();
    }

    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const micBtn = document.getElementById('chatbot-mic-btn');
    const messagesContainer = document.getElementById('chatbot-messages');

    // Funzione di invio messaggio utente
    function handleSubmit(e) {
        if (e) e.preventDefault();
        if (!input) return;

        const text = input.value.trim();
        if (!text) return;

        // Inserisce bubble utente
        window.ChatbotUI.appendUserMessage(text);

        // Reset campo
        input.value = '';
        input.focus();

        // Invia prompt ad API / fallback
        if (window.ChatbotAPI) {
            window.ChatbotAPI.sendPrompt(text);
        }
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleSubmit);
    }

    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
            }
        });
    }

    // Gestione clic sui chip di suggerimento (Quick Suggestion Chips)
    if (messagesContainer) {
        messagesContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.chatbot-suggestion-chip');
            if (chip) {
                const queryText = chip.getAttribute('data-chip-text') || chip.innerText.trim();
                if (queryText) {
                    window.ChatbotUI.appendUserMessage(queryText);
                    if (window.ChatbotAPI) {
                        window.ChatbotAPI.sendPrompt(queryText);
                    }
                }
            }
        });
    }

    // Supporto Messaggio Vocale (Speech-to-Text se supportato dal browser o prompt rapido)
    if (micBtn) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = 'it-IT';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                micBtn.classList.add('is-listening');
                micBtn.title = 'In ascolto... Parla ora';
            };

            recognition.onresult = (event) => {
                const speechResult = event.results[0][0].transcript;
                if (input && speechResult) {
                    input.value = speechResult;
                    handleSubmit();
                }
            };

            recognition.onerror = () => {
                micBtn.classList.remove('is-listening');
            };

            recognition.onend = () => {
                micBtn.classList.remove('is-listening');
                micBtn.title = 'Messaggio vocale';
            };

            micBtn.addEventListener('click', () => {
                try {
                    recognition.start();
                } catch (err) {
                    recognition.stop();
                }
            });
        } else {
            // Simulazione prompt vocale predefinito per browser senza Web Speech
            micBtn.addEventListener('click', () => {
                if (input) {
                    input.value = "Quali sono le migliori mete disponibili questo mese?";
                    handleSubmit();
                }
            });
        }
    }
});

