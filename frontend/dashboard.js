// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const analyzeBtn = document.getElementById('analyzeBtn');
const preferencesText = document.getElementById('preferencesText');
const resultsSection = document.getElementById('resultsSection');
const resultsContent = document.getElementById('resultsContent');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

let currentUser = null;
let selectedFile = null;

// Initialize
window.addEventListener('load', () => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(user);
    document.getElementById('userName').textContent = `Hi, ${currentUser.name}!`;
    document.getElementById('userGender').textContent = currentUser.gender === 'male' ? '♂️ Men\'s Fashion' : '♀️ Women\'s Fashion';
    
    // Initialize chatbot after currentUser is loaded
    initializeChatbot();
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Tab Switching
function switchTab(e, tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    e.target.classList.add('active');
}

// Upload Area Handlers
uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    if (e.dataTransfer.files.length > 0) {
        handleFileSelect(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
    }
});

function handleFileSelect(file) {
    if (file.type.startsWith('image/')) {
        selectedFile = file;
        const uploadContent = uploadArea.querySelector('div');
        uploadArea.innerHTML = `
            <input type="file" id="fileInput" accept="image/*" hidden>
            <div style="padding: 0;">
                <div style="font-size: 32px; margin-bottom: 10px;">✅</div>
                <div class="upload-text">${file.name}</div>
                <div class="upload-subtext">Ready to analyze</div>
            </div>
        `;
        analyzeBtn.disabled = false;
    } else {
        alert('Please select an image file.');
    }
}

// Analyze Outfit
analyzeBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing... ';
    analyzeBtn.innerHTML = 'Analyzing... <span class="loading-spinner"></span>';

    try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('http://localhost:8001/analyze-outfit', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayResults(data.recommendations, true);
    } catch (error) {
        console.error('Error:', error);
        displayResults('Error analyzing outfit. Please try again.', false);
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = 'Analyze Outfit';
    }
});

// Get Text Recommendation
async function getTextRecommendation() {
    const preferences = preferencesText.value.trim();
    if (!preferences) {
        alert('Please enter your style preferences.');
        return;
    }

    const textRecommendBtn = document.getElementById('textRecommendBtn');
    textRecommendBtn.disabled = true;
    textRecommendBtn.innerHTML = 'Generating... <span class="loading-spinner"></span>';

    try {
        const response = await fetch('http://localhost:8001/text-recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ preferences, gender: currentUser.gender })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayResults(data.recommendations, true);
    } catch (error) {
        console.error('Error:', error);
        displayResults('Error generating recommendations. Please try again.', false);
    } finally {
        textRecommendBtn.disabled = false;
        textRecommendBtn.textContent = 'Get Recommendations';
    }
}

// Display Results
function displayResults(content, isSuccess) {
    try {
        // If content is already an object, use it directly
        let data = typeof content === 'string' ? JSON.parse(content) : content;
        
        let html = '';
        
        if (data.description) {
            html += `<div class="result-item animate-result">
                    <div class="result-label">📋 Description</div>
                    <div class="result-content">${data.description}</div>
                </div>`;
        }
        if (data.style) {
            html += `<div class="result-item animate-result" style="animation-delay: 0.1s">
                    <div class="result-label">🎨 Style</div>
                    <div class="result-content">${data.style}</div>
                </div>`;
        }
        if (data.colors && typeof data.colors === 'string') {
            html += `<div class="result-item animate-result" style="animation-delay: 0.2s">
                    <div class="result-label">🌈 Colors</div>
                    <div class="result-content">${data.colors}</div>
                </div>`;
        }
        if (data.suggestions) {
            html += `<div class="result-item animate-result" style="animation-delay: 0.3s">
                    <div class="result-label">💡 Suggestions</div>
                    <div class="result-content">${data.suggestions}</div>
                </div>`;
        }
        if (data.trends) {
            html += `<div class="result-item animate-result" style="animation-delay: 0.4s">
                    <div class="result-label">✨ Trends & Insights</div>
                    <div class="result-content">${data.trends}</div>
                </div>`;
        }
        if (data.occasions) {
            html += `<div class="result-item animate-result" style="animation-delay: 0.5s">
                    <div class="result-label">🎉 Best For</div>
                    <div class="result-content">${data.occasions}</div>
                </div>`;
        }
        
        // Handle text recommendation with array outputs
        if (data.outfits && Array.isArray(data.outfits)) {
            html += `<div class="result-item animate-result" style="animation-delay: 0.1s">
                    <div class="result-label">👔 Outfit Suggestions</div>
                    <div class="result-content outfit-list">
                        ${data.outfits.map((outfit, i) => `<div class="suggestion-item" style="animation-delay: ${0.1 + i*0.1}s">✓ ${outfit}</div>`).join('')}
                    </div>
                </div>`;
        }
        if (data.colors && Array.isArray(data.colors)) {
            html += `<div class="result-item animate-result" style="animation-delay: 0.2s">
                    <div class="result-label">🌈 Color Palette</div>
                    <div class="result-content color-list">
                        ${data.colors.map((color, i) => `<span class="color-tag" style="animation-delay: ${0.1 + i*0.1}s">${color}</span>`).join('')}
                    </div>
                </div>`;
        }
        if (data.accessories && Array.isArray(data.accessories)) {
            html += `<div class="result-item animate-result" style="animation-delay: 0.3s">
                    <div class="result-label">✨ Essential Accessories</div>
                    <div class="result-content accessory-list">
                        ${data.accessories.map((acc, i) => `<div class="suggestion-item" style="animation-delay: ${0.1 + i*0.1}s">• ${acc}</div>`).join('')}
                    </div>
                </div>`;
        }
        if (data.tips && Array.isArray(data.tips)) {
            html += `<div class="result-item animate-result" style="animation-delay: 0.4s">
                    <div class="result-label">💎 Expert Tips</div>
                    <div class="result-content tips-list">
                        ${data.tips.map((tip, i) => `<div class="suggestion-item" style="animation-delay: ${0.1 + i*0.1}s">→ ${tip}</div>`).join('')}
                    </div>
                </div>`;
        }
        
        resultsContent.innerHTML = html;
        resultsSection.classList.add('show');
    } catch (error) {
        console.error('Error parsing results:', error);
        resultsContent.innerHTML = `<div class="result-item"><div class="result-content">${content}</div></div>`;
        resultsSection.classList.add('show');
    }
}

// Chatbot Functionality
let fashionResponses = {};

function initializeChatbot() {
    fashionResponses = {
        greetings: {
            pattern: /(hi|hello|hey|greetings|thanks|thank you)/i,
            response: "Hey there! 👋 I'm excited to help you with fashion advice. What would you like to know?"
        },
        colors: {
            pattern: /(color|combination|what color|best color|hue|shade|tone|palette)/i,
            response: "Colors are so important! For your " + (currentUser?.gender === 'male' ? 'men\'s fashion' : 'women\'s fashion') + ", consider: navy blue, black, white, and earth tones for versatility. What's your preference?"
        },
        formal: {
            pattern: /(formal|business|professional|meeting|interview|suit|blazer|dress shirt|tie)/i,
            response: "For " + (currentUser?.gender === 'male' ? 'formal occasions, a well-fitted suit with a crisp dress shirt and tie is perfect. Add cufflinks for sophistication!' : 'formal occasions, a tailored dress or pantsuit works wonderfully. Pair with elegant heels and minimal jewelry.')
        },
        casual: {
            pattern: /(casual|weekend|hangout|relax|chill|jeans|t-shirt|comfortable)/i,
            response: "For casual wear, comfort is key! Try: " + (currentUser?.gender === 'male' ? 'jeans, t-shirts, sneakers, and jackets. You can\'t go wrong!' : 'comfortable jeans, casual tops, sneakers. Accessorize with bags and jewelry!')
        },
        western: {
            pattern: /(western|cowboy|denim|boots|rustic|ranch|wear)/i,
            response: "Western style is awesome! Go for: denim jackets, cowboy boots, plaid shirts, and western hats. Pair with fitted jeans! 🤠"
        },
        accessories: {
            pattern: /(accessory|accessories|watch|bag|shoes|belt|jewelry|necklace|earring)/i,
            response: "Great question! Essential pieces: " + (currentUser?.gender === 'male' ? 'a classic watch, leather belt, quality shoes, and a nice bag.' : 'a quality handbag, elegant jewelry, stylish shoes, and a watch or bracelet.')
        },
        trends: {
            pattern: /(trend|trending|latest|fashion|style|2024|2025|modern|current)/i,
            response: "Right now: oversized fits, neutral colors, minimalist designs, and vintage pieces are trending. Sustainability is huge! Mix classic with trendy pieces."
        },
        outfit: {
            pattern: /(outfit|combination|wear|suggest|style|help me|give me|recommend)/i,
            response: "Tell me the occasion - formal, casual, party, or western? Or upload a photo and I'll analyze it for you! 📸"
        },
        thank_you: {
            pattern: /(thank|thanks|appreciate|grateful|love|awesome|great|perfect|thanks)/i,
            response: "You're welcome! 😊 Happy to help with more fashion advice!"
        }
    };
}

function generateFashionResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check each pattern
    for (const [key, rule] of Object.entries(fashionResponses)) {
        if (rule.pattern.test(lowerMessage)) {
            return rule.response;
        }
    }
    
    // Default response
    return "That's a great question! 🤔 Ask me about outfits, colors, accessories, formal wear, casual styles, western fashion, or trends!";
}

function sendMessage() {
    const messageValue = chatInput.value.trim();
    if (!messageValue) {
        return;
    }

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.textContent = messageValue;
    chatMessages.appendChild(userMessageDiv);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Bot response with delay
    setTimeout(() => {
        const botResponse = generateFashionResponse(messageValue);
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message', 'bot-message');
        botMessageDiv.textContent = botResponse;
        chatMessages.appendChild(botMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
}

// Simplified Enter key handler
if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}
