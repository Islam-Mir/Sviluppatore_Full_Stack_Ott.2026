/**
 * Chatbot Agenzia Viaggi - chat-window.js
 * Gestione della finestra di chat:
 * - Apertura / Chiusura / Minimizzazione
 * - Ridimensionamento fluido tramite bordi/angoli (drag resize)
 * - Modalità Schermo Intero (Fullscreen)
 * - Gestione del Badge Prompt Fisso ("Chatta con l'IA ✈️")
 */

const ChatbotWindow = {
    isOpen: false,
    isFullscreen: false,
    savedDimensions: { width: 400, height: 570 },

    init() {
        this.windowEl = document.getElementById('chatbot-window');
        this.launcherBtn = document.getElementById('chatbot-launcher-btn');
        this.promptBadge = document.getElementById('chatbot-prompt-badge');
        this.badgeCloseBtn = document.getElementById('chatbot-badge-close');
        this.fullscreenBtn = document.getElementById('chatbot-fullscreen-btn');
        this.closeBtn = document.getElementById('chatbot-close-btn');

        if (!this.windowEl || !this.launcherBtn) return;

        // Ripristina dimensioni salvate da LocalStorage se presenti
        this.loadSavedDimensions();

        // Eventi apertura / chiusura
        this.launcherBtn.addEventListener('click', () => this.toggle());
        if (this.promptBadge) {
            this.promptBadge.addEventListener('click', (e) => {
                if (e.target === this.badgeCloseBtn || this.badgeCloseBtn.contains(e.target)) return;
                this.open();
            });
        }

        if (this.badgeCloseBtn) {
            this.badgeCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hidePromptBadge();
            });
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        if (this.fullscreenBtn) {
            this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        // Tasto Escape per chiudere / uscire da fullscreen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                if (this.isFullscreen) {
                    this.toggleFullscreen();
                } else {
                    this.close();
                }
            }
        });

        // Inizializza il ridimensionamento interattivo (barre e angoli)
        this.initResizing();
    },

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    open() {
        this.isOpen = true;
        this.windowEl.classList.add('is-open');
        this.launcherBtn.classList.add('is-active');
        if (this.promptBadge) {
            this.promptBadge.style.display = 'none';
        }

        // Focus sul campo input e scroll in basso
        const input = document.getElementById('chatbot-input');
        if (input) {
            setTimeout(() => input.focus(), 200);
        }
        if (window.ChatbotUI) {
            window.ChatbotUI.scrollToBottom(false);
        }
    },

    close() {
        this.isOpen = false;
        this.windowEl.classList.remove('is-open');
        this.launcherBtn.classList.remove('is-active');

        // Se non era stato chiuso esplicitamente con la x, ripristina il badge prompt
        const badgeDismissed = sessionStorage.getItem('chatbot_badge_dismissed');
        if (this.promptBadge && !badgeDismissed) {
            this.promptBadge.style.display = 'flex';
        }
    },

    hidePromptBadge() {
        if (this.promptBadge) {
            this.promptBadge.style.display = 'none';
            sessionStorage.setItem('chatbot_badge_dismissed', 'true');
        }
    },

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        const iconSpan = this.fullscreenBtn ? this.fullscreenBtn.querySelector('.material-icon-fs') : null;

        if (this.isFullscreen) {
            // Salva dimensioni attuali prima di espandere
            this.savedDimensions.width = this.windowEl.offsetWidth;
            this.savedDimensions.height = this.windowEl.offsetHeight;

            this.windowEl.classList.add('is-fullscreen');
            if (iconSpan) iconSpan.innerHTML = '&#x2921;'; // Simbolo riduci / exit fullscreen
            if (this.fullscreenBtn) this.fullscreenBtn.title = "Esci da schermo intero";
        } else {
            this.windowEl.classList.remove('is-fullscreen');
            if (iconSpan) iconSpan.innerHTML = '&#x26F6;'; // Simbolo espandi / fullscreen
            if (this.fullscreenBtn) this.fullscreenBtn.title = "Schermo intero";

            // Ripristina dimensioni precedenti
            this.applyDimensions(this.savedDimensions.width, this.savedDimensions.height);
        }

        if (window.ChatbotUI) {
            window.ChatbotUI.scrollToBottom(true);
        }
    },

    // --------------------------------------------------------------------------
    // Ridimensionamento fluido tramite Mouse e Touch (Top, Left, Top-Left Corner)
    // --------------------------------------------------------------------------
    initResizing() {
        const corner = this.windowEl.querySelector('.chatbot-resize-corner');
        const leftBorder = this.windowEl.querySelector('.chatbot-resize-left');
        const topBorder = this.windowEl.querySelector('.chatbot-resize-top');

        const startResize = (e, direction) => {
            if (this.isFullscreen) return;
            e.preventDefault();

            const startX = e.clientX || (e.touches && e.touches[0].clientX);
            const startY = e.clientY || (e.touches && e.touches[0].clientY);
            const startWidth = this.windowEl.offsetWidth;
            const startHeight = this.windowEl.offsetHeight;

            const onMouseMove = (moveEvent) => {
                const currentX = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0].clientX);
                const currentY = moveEvent.clientY || (moveEvent.touches && moveEvent.touches[0].clientY);

                let newWidth = startWidth;
                let newHeight = startHeight;

                // Trascinando verso sinistra (diminuzione di X) la larghezza aumenta
                if (direction === 'both' || direction === 'horizontal') {
                    const deltaX = startX - currentX;
                    newWidth = startWidth + deltaX;
                }

                // Trascinando verso l'alto (diminuzione di Y) l'altezza aumenta
                if (direction === 'both' || direction === 'vertical') {
                    const deltaY = startY - currentY;
                    newHeight = startHeight + deltaY;
                }

                // Limiti massimi e minimi
                const minW = 320;
                const minH = 420;
                const maxW = window.innerWidth * 0.95;
                const maxH = window.innerHeight * 0.90;

                newWidth = Math.max(minW, Math.min(newWidth, maxW));
                newHeight = Math.max(minH, Math.min(newHeight, maxH));

                this.applyDimensions(newWidth, newHeight);
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('touchmove', onMouseMove);
                document.removeEventListener('touchend', onMouseUp);
                this.saveDimensions();
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchmove', onMouseMove, { passive: false });
            document.addEventListener('touchend', onMouseUp);
        };

        if (corner) {
            corner.addEventListener('mousedown', (e) => startResize(e, 'both'));
            corner.addEventListener('touchstart', (e) => startResize(e, 'both'), { passive: false });
        }
        if (leftBorder) {
            leftBorder.addEventListener('mousedown', (e) => startResize(e, 'horizontal'));
            leftBorder.addEventListener('touchstart', (e) => startResize(e, 'horizontal'), { passive: false });
        }
        if (topBorder) {
            topBorder.addEventListener('mousedown', (e) => startResize(e, 'vertical'));
            topBorder.addEventListener('touchstart', (e) => startResize(e, 'vertical'), { passive: false });
        }
    },

    applyDimensions(width, height) {
        this.windowEl.style.width = `${width}px`;
        this.windowEl.style.height = `${height}px`;
    },

    saveDimensions() {
        if (this.isFullscreen) return;
        const dims = {
            width: this.windowEl.offsetWidth,
            height: this.windowEl.offsetHeight
        };
        try {
            localStorage.setItem('chatbot_dimensions', JSON.stringify(dims));
        } catch (e) {}
    },

    loadSavedDimensions() {
        try {
            const saved = localStorage.getItem('chatbot_dimensions');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.width && parsed.height && window.innerWidth > 600) {
                    const validW = Math.max(320, Math.min(parsed.width, window.innerWidth * 0.95));
                    const validH = Math.max(420, Math.min(parsed.height, window.innerHeight * 0.90));
                    this.applyDimensions(validW, validH);
                    this.savedDimensions = { width: validW, height: validH };
                }
            }
        } catch (e) {}
    }
};

window.ChatbotWindow = ChatbotWindow;

