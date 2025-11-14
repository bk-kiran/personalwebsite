// Chatbot Widget Loader
// Add this to your website: <script src="chat-withbk.js"></script>

(function() {
    // Configuration
    const config = {
        chatbotUrl: 'https://chatwithbk.vercel.app/widget', // ✅ Using optimized widget route
        buttonColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        headerTitle: 'Chat with BK Bot',
        headerSubtitle: 'Ask Anything about Kiran!',
        position: 'right' // 'right' or 'left'
    };

    // Inject styles
    const styles = `
        .chat-widget-button {
            position: fixed;
            bottom: 20px;
            ${config.position}: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: ${config.buttonColor};
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9998;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            
            /* Fade-down entry animation with delay */
            opacity: 0;
            animation: fadeDown 0.6s ease-out 0.8s forwards;
        }
        
        @keyframes fadeDown {
            0% {
                opacity: 0;
                transform: translateY(-30px) scale(0.9);
            }
            100% {
                opacity: 1;
                transform: translateY(0px) scale(1);
            }
        }
        
        .chat-widget-button:hover { 
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .chat-widget-button svg { 
            width: 30px; 
            height: 30px; 
            fill: white;
        }
        .chat-widget-container {
            position: fixed;
            bottom: 90px;
            ${config.position}: 20px;
            width: 380px;
            height: 600px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            display: none;
            flex-direction: column;
            z-index: 9999;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }
        .chat-widget-container.open { display: flex; }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .chat-widget-header {
            background: ${config.buttonColor};
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .chat-widget-header h3 { margin: 0; font-size: 18px; font-weight: 600; }
        .chat-widget-header p { margin: 5px 0 0 0; font-size: 12px; opacity: 0.9; }
        .chat-widget-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
        }
        .chat-widget-close:hover { background: rgba(255, 255, 255, 0.2); }
        .chat-widget-iframe { flex: 1; border: none; width: 100%; }
        @media (max-width: 768px) {
            .chat-widget-container { width: calc(100vw - 40px); height: calc(100vh - 120px); }
        }
        @media (max-width: 480px) {
            .chat-widget-container {
                width: 100vw;
                height: 100vh;
                ${config.position}: 0;
                bottom: 0;
                border-radius: 0;
            }
        }
    `;

    // Inject CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create HTML
    const widgetHTML = `
        <button class="chat-widget-button" id="chatWidgetButton" aria-label="Open chat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
            </svg>
        </button>
        <div class="chat-widget-container" id="chatWidgetContainer">
            <div class="chat-widget-header">
                <div>
                    <h3>${config.headerTitle}</h3>
                    <p>${config.headerSubtitle}</p>
                </div>
                <button class="chat-widget-close" id="chatWidgetClose" aria-label="Close chat">×</button>
            </div>
            <iframe 
                class="chat-widget-iframe" 
                src="${config.chatbotUrl}"
                title="${config.headerTitle}"
                allow="clipboard-write"
            ></iframe>
        </div>
    `;

    // Wait for DOM to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Inject HTML
        document.body.insertAdjacentHTML('beforeend', widgetHTML);

        // Add event listeners
        const chatButton = document.getElementById('chatWidgetButton');
        const chatContainer = document.getElementById('chatWidgetContainer');
        const chatClose = document.getElementById('chatWidgetClose');

        chatButton.addEventListener('click', () => {
            chatContainer.classList.add('open');
            chatButton.style.display = 'none';
        });

        chatClose.addEventListener('click', () => {
            chatContainer.classList.remove('open');
            chatButton.style.display = 'flex';
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatContainer.classList.contains('open')) {
                chatContainer.classList.remove('open');
                chatButton.style.display = 'flex';
            }
        });
    }
})();