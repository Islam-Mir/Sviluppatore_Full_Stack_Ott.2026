/**
 * Chatbot Agenzia Viaggi - chat-export.js
 * Esportazione dei messaggi della chat in vari formati (.txt, .csv, .pdf)
 * con branding personalizzato per Agenzia Viaggi.
 */

const ChatbotExport = {
    init() {
        this.exportBtn = document.getElementById('chatbot-export-btn');
        this.exportMenu = document.getElementById('chatbot-export-menu');

        if (this.exportBtn) {
            this.exportBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMenu();
            });
        }

        // Chiudi menu al clic esterno
        document.addEventListener('click', (e) => {
            if (this.exportMenu && !this.exportMenu.contains(e.target) && e.target !== this.exportBtn) {
                this.closeMenu();
            }
        });
    },

    toggleMenu() {
        if (!this.exportMenu) return;
        this.exportMenu.classList.toggle('is-active');
    },

    closeMenu() {
        if (!this.exportMenu) return;
        this.exportMenu.classList.remove('is-active');
    },

    // 1. Esportazione TXT
    exportTXT() {
        this.closeMenu();
        const history = window.ChatbotState.chatHistory;
        if (!history || history.length === 0) {
            alert('Nessun messaggio presente nella chat.');
            return;
        }

        const now = new Date().toLocaleString('it-IT');
        let content = `=================================================\n`;
        content += `   AGENZIA VIAGGI - REGISTRO CHAT ASSISTENTE IA\n`;
        content += `   Data esportazione: ${now}\n`;
        content += `=================================================\n\n`;

        history.forEach((msg) => {
            const label = msg.sender === 'user' ? 'Tu' : 'ViaggiBot';
            content += `[${msg.timeStamp}] ${label}:\n${msg.text}\n\n`;
        });

        this.downloadBlob(content, 'conversazione-agenzia-viaggi.txt', 'text/plain;charset=utf-8');
    },

    // 2. Esportazione CSV
    exportCSV() {
        this.closeMenu();
        const history = window.ChatbotState.chatHistory;
        if (!history || history.length === 0) {
            alert('Nessun messaggio presente nella chat.');
            return;
        }

        // BOM UTF-8 per corretta apertura in Excel
        let csvContent = '\uFEFF"Orario","Mittente","Messaggio"\r\n';

        history.forEach((msg) => {
            const senderLabel = msg.sender === 'user' ? 'Tu' : 'ViaggiBot';
            const safeTime = `"${msg.timeStamp.replace(/"/g, '""')}"`;
            const safeSender = `"${senderLabel.replace(/"/g, '""')}"`;
            const safeText = `"${msg.text.replace(/"/g, '""')}"`;
            csvContent += `${safeTime},${safeSender},${safeText}\r\n`;
        });

        this.downloadBlob(csvContent, 'conversazione-agenzia-viaggi.csv', 'text/csv;charset=utf-8');
    },

    // 3. Esportazione PDF
    exportPDF() {
        this.closeMenu();
        const history = window.ChatbotState.chatHistory;
        if (!history || history.length === 0) {
            alert('Nessun messaggio presente nella chat.');
            return;
        }

        const printWindow = window.open('', '_blank', 'width=850,height=750');
        if (!printWindow) {
            alert('Permetti i popup nel browser per visualizzare o salvare il PDF.');
            return;
        }

        let messagesHtml = '';
        history.forEach((msg) => {
            const isUser = msg.sender === 'user';
            const bubbleBg = isUser ? '#142c49' : '#ffffff';
            const textColor = isUser ? '#ffffff' : '#1e293b';
            const border = isUser ? 'none' : '1px solid #e2e8f0';
            const align = isUser ? 'right' : 'left';
            const label = isUser ? 'Tu' : 'ViaggiBot (Assistente IA)';

            messagesHtml += `
                <div style="margin-bottom: 18px; text-align: ${align};">
                    <div style="font-size: 11px; font-weight: 700; color: ${isUser ? '#142c49' : '#0d6efd'}; margin-bottom: 4px;">
                        ${label} <span style="font-size: 10px; font-weight: normal; color: #64748b;">(${msg.timeStamp})</span>
                    </div>
                    <div style="background-color: ${bubbleBg}; color: ${textColor}; border: ${border}; border-radius: 12px; padding: 12px 16px; font-size: 13px; line-height: 1.5; display: inline-block; max-width: 80%; text-align: left; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
                        ${msg.html || window.ChatbotState.escapeHtml(msg.text).replace(/\n/g, '<br>')}
                    </div>
                </div>
            `;
        });

        const now = new Date().toLocaleString('it-IT');
        const docHtml = `
            <!DOCTYPE html>
            <html lang="it">
            <head>
                <meta charset="utf-8">
                <title>Agenzia Viaggi - Trascrizione Chat</title>
                <style>
                    @page { margin: 15mm; }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                        background-color: #f8fafc;
                        color: #1e293b;
                        margin: 0;
                        padding: 24px;
                    }
                    .header {
                        background-color: #142c49;
                        color: #ffffff;
                        padding: 16px 20px;
                        border-radius: 12px;
                        margin-bottom: 24px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .title { font-size: 18px; font-weight: bold; }
                    .badge { font-size: 11px; color: #2dd4bf; font-weight: 600; margin-top: 3px; }
                    .date { font-size: 11px; color: #94a3b8; }
                    .chat-box {
                        background-color: #f1f5f9;
                        border-radius: 16px;
                        padding: 20px;
                        border: 1px solid #e2e8f0;
                    }
                    .footer {
                        margin-top: 24px;
                        text-align: center;
                        font-size: 11px;
                        color: #64748b;
                        border-top: 1px solid #e2e8f0;
                        padding-top: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <div class="title">✈️ Agenzia Viaggi</div>
                        <div class="badge">ViaggiBot AI • Registro Conversazione</div>
                    </div>
                    <div class="date">Esportato il: ${now}</div>
                </div>
                <div class="chat-box">
                    ${messagesHtml}
                </div>
                <div class="footer">
                    Agenzia Viaggi • Portale Prenotazioni e Gestione Destinazioni
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(() => window.print(), 250);
                    };
                <\/script>
            </body>
            </html>
        `;

        printWindow.document.open();
        printWindow.document.write(docHtml);
        printWindow.document.close();
    },

    downloadBlob(content, fileName, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 150);
    }
};

window.ChatbotExport = ChatbotExport;

