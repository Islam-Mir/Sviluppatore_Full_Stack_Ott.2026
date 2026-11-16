/**
 * Chatbot Agenzia Viaggi - chat-ui.js
 * Rendering DOM dei messaggi, animazioni del typing indicator e quick chips.
 */

const ChatbotUI = {
    // Renderizza l'intera cronologia dei messaggi nella finestra
    renderChat() {
        const container = document.getElementById('chatbot-messages');
        if (!container) return;

        container.innerHTML = `
            <div class="chatbot-date-chip">
                Oggi
            </div>
        `;

        window.ChatbotState.chatHistory.forEach(msg => {
            this.renderSingleMessage(msg);
        });

        this.scrollToBottom(false);
    },

    // Renderizza un singolo messaggio (utente o bot)
    renderSingleMessage(msg) {
        const container = document.getElementById('chatbot-messages');
        if (!container) return;

        if (msg.sender === 'user') {
            const userRow = document.createElement('div');
            userRow.className = 'chatbot-msg-row-user';
            userRow.innerHTML = `
                <div class="chatbot-msg-user-content">
                    <div class="chatbot-msg-bubble-user">
                        ${window.ChatbotState.escapeHtml(msg.text)}
                    </div>
                    <div class="chatbot-msg-user-avatar">
                        <img src="${window.ChatbotState.USER_AVATAR}" alt="Tu" onerror="this.src='https://ui-avatars.com/api/?name=User&background=142c49&color=fff'">
                    </div>
                </div>
                <div class="chatbot-msg-timestamp">${window.ChatbotState.escapeHtml(msg.timeStamp)} • Inviato</div>
            `;
            container.appendChild(userRow);
        } else {
            const botRow = document.createElement('div');
            botRow.className = 'chatbot-msg-row-bot';
            const content = msg.html || window.ChatbotState.escapeHtml(msg.text).replace(/\n/g, '<br>');

            let suggestionsHtml = '';
            if (Array.isArray(msg.suggestions) && msg.suggestions.length > 0) {
                suggestionsHtml = `
                    <div class="chatbot-suggestions-container">
                        ${msg.suggestions.map(s => `
                            <button type="button" class="chatbot-suggestion-chip" data-chip-text="${window.ChatbotState.escapeHtml(s)}">
                                ${window.ChatbotState.escapeHtml(s)}
                            </button>
                        `).join('')}
                    </div>
                `;
            }

            botRow.innerHTML = `
                <div class="chatbot-msg-avatar">
                    <img src="${window.ChatbotState.BOT_AVATAR}" alt="ViaggiBot" onerror="this.src='/images/chatbot/bot.png'">
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div class="chatbot-msg-bubble-bot">
                        ${content}
                    </div>
                    ${suggestionsHtml}
                </div>
            `;
            container.appendChild(botRow);
        }
    },

    appendUserMessage(text) {
        const timestamp = window.ChatbotState.getCurrentTimestamp();
        const msg = {
            sender: 'user',
            avatar: window.ChatbotState.USER_AVATAR,
            text: text,
            timeStamp: timestamp
        };

        window.ChatbotState.chatHistory.push(msg);
        window.ChatbotState.saveChatHistory();
        this.renderSingleMessage(msg);
        this.scrollToBottom(true);
    },

    appendBotMessage(htmlOrText, suggestions = []) {
        const timestamp = window.ChatbotState.getCurrentTimestamp();
        const plainText = window.ChatbotState.stripHtml(htmlOrText);
        const msg = {
            sender: 'bot',
            avatar: window.ChatbotState.BOT_AVATAR,
            text: plainText,
            html: htmlOrText,
            suggestions: suggestions,
            timeStamp: timestamp
        };

        window.ChatbotState.chatHistory.push(msg);
        window.ChatbotState.saveChatHistory();
        this.renderSingleMessage(msg);
        this.scrollToBottom(true);
    },

    showTypingIndicator() {
        const container = document.getElementById('chatbot-messages');
        if (!container || document.getElementById('chatbot-typing-indicator')) return;

        const row = document.createElement('div');
        row.id = 'chatbot-typing-indicator';
        row.className = 'chatbot-typing-row';
        row.innerHTML = `
            <div class="chatbot-msg-avatar">
                <img src="${window.ChatbotState.BOT_AVATAR}" alt="ViaggiBot">
            </div>
            <div class="chatbot-typing-bubble">
                <span class="chatbot-typing-dot"></span>
                <span class="chatbot-typing-dot"></span>
                <span class="chatbot-typing-dot"></span>
            </div>
        `;
        container.appendChild(row);
        this.scrollToBottom(true);
    },

    removeTypingIndicator() {
        const ind = document.getElementById('chatbot-typing-indicator');
        if (ind) ind.remove();
    },

    scrollToBottom(smooth = true) {
        const container = document.getElementById('chatbot-messages');
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: smooth ? 'smooth' : 'auto'
            });
        }
    }
};

window.ChatbotUI = ChatbotUI;

