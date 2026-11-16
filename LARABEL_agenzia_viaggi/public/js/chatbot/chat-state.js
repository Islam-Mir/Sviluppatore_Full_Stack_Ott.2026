/**
 * Chatbot Agenzia Viaggi - chat-state.js
 * Gestione dello stato della conversazione (Array Single Source of Truth)
 * e salvataggio locale (LocalStorage).
 */

const STORAGE_KEY = 'agenzia_viaggi_chatbot_history';
const BOT_AVATAR = '/images/chatbot/bot.png';
const USER_AVATAR = '/images/chatbot/user.jpg';

// Inizializzazione della cronologia messaggi con messaggio di benvenuto predefinito
const defaultHistory = [
    {
        sender: 'bot',
        avatar: BOT_AVATAR,
        text: "Ciao! Sono ViaggiBot, l'assistente virtuale di Agenzia Viaggi. ✈️\nCome posso aiutarti oggi? Posso mostrarti le nostre destinazioni, verificare disponibilità di posti e prezzi, o spiegarti come effettuare una prenotazione!",
        html: `Ciao! Sono <strong class="text-primary">ViaggiBot</strong>, l'assistente virtuale di <strong>Agenzia Viaggi</strong>. ✈️<br><br>Come posso aiutarti oggi? Posso mostrarti le nostre mete, verificare la disponibilità in tempo reale e i prezzi, o spiegarti come effettuare una prenotazione!`,
        timeStamp: getCurrentTimestamp(),
        suggestions: ['Quali destinazioni ci sono?', 'Mete più economiche', 'Come prenotare?']
    }
];

// Carica da LocalStorage se disponibile, altrimenti usa default
let chatHistory = loadChatHistory();

function loadChatHistory() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.warn('Impossibile caricare chatHistory da LocalStorage:', e);
    }
    return [...defaultHistory];
}

function saveChatHistory() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    } catch (e) {
        console.warn('Impossibile salvare chatHistory su LocalStorage:', e);
    }
}

function clearChatHistory() {
    chatHistory = [...defaultHistory];
    saveChatHistory();
}

function getCurrentTimestamp() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function stripHtml(html) {
    if (typeof html !== 'string') return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

// Esponi nello scope globale
window.ChatbotState = {
    chatHistory,
    BOT_AVATAR,
    USER_AVATAR,
    getCurrentTimestamp,
    escapeHtml,
    stripHtml,
    saveChatHistory,
    clearChatHistory
};

