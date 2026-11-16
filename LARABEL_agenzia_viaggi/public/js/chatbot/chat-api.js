/**
 * Chatbot Agenzia Viaggi - chat-api.js
 * Comunicazione asincrona con l'endpoint Laravel (/chatbot/message)
 * con fallback intelligente locale in caso di disconnessione o errore.
 */

const ChatbotAPI = {
    endpoint: '/chatbot/message',

    async sendPrompt(userMessage) {
        // Mostra indicatore di digitazione
        window.ChatbotUI.showTypingIndicator();

        const tokenMeta = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = tokenMeta ? tokenMeta.getAttribute('content') : '';

        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) {
                throw new Error(`Server status ${response.status}`);
            }

            const data = await response.json();
            
            // Simula un breve tempo di lettura realistico (minimo 500ms)
            await new Promise(res => setTimeout(res, 500));

            window.ChatbotUI.removeTypingIndicator();
            window.ChatbotUI.appendBotMessage(data.reply, data.suggestions || []);
        } catch (error) {
            console.warn('API Chatbot fallita, uso motore di fallback locale:', error);

            // Simulazione fallback con dati tipici dell'agenzia di viaggi
            await new Promise(res => setTimeout(res, 800));
            window.ChatbotUI.removeTypingIndicator();

            const fallbackReply = this.localFallback(userMessage);
            window.ChatbotUI.appendBotMessage(fallbackReply.reply, fallbackReply.suggestions);
        }
    },

    // Risposte locali intelligenti per Agenzia Viaggi (se backend offline)
    localFallback(prompt) {
        const lower = prompt.toLowerCase();

        if (lower.includes('ciao') || lower.includes('buongiorno') || lower.includes('salve')) {
            return {
                reply: "Ciao! Sono <strong>ViaggiBot</strong>, il tuo assistente per le vacanze. ✈️ Come posso aiutarti oggi?",
                suggestions: ['Destinazioni disponibili', 'Mete economiche', 'Come prenotare?']
            };
        } else if (lower.includes('economic') || lower.includes('prezz') || lower.includes('cost') || lower.includes('offert')) {
            return {
                reply: "I nostri viaggi partono da tariffe promozionali vantaggiose per le capitali europee e mete balneari! Puoi consultare l'elenco completo nella sezione <strong>Destinazioni</strong>.",
                suggestions: ['Quali destinazioni ci sono?', 'Come prenotare?']
            };
        } else if (lower.includes('prenot') || lower.includes('come')) {
            return {
                reply: "Puoi selezionare la destinazione che preferisci e contattare la nostra reception per bloccare i posti, oppure gli utenti amministratori possono inserire la prenotazione dal menu in alto.",
                suggestions: ['Destinazioni disponibili', 'Contatti e orari']
            };
        } else if (lower.includes('document') || lower.includes('passaport') || lower.includes('bagagl')) {
            return {
                reply: "Per i viaggi in Europa è sufficiente la carta d'identità valida per l'espatrio. Per i viaggi extra-UE è necessario il passaporto con almeno 6 mesi di validità residua.",
                suggestions: ['Destinazioni disponibili', 'Come prenotare?']
            };
        } else {
            return {
                reply: "Ricevuto! Sto sincronizzando i dettagli con il database di <strong>Agenzia Viaggi</strong>. Puoi esplorare tutte le nostre mete attive o chiedermi disponibilità specifiche di date e posti!",
                suggestions: ['Destinazioni disponibili', 'Mete economiche', 'Come prenotare?']
            };
        }
    }
};

window.ChatbotAPI = ChatbotAPI;

