// DOM elements
const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const analyzeBtn = document.getElementById('analyzeBtn');
const textRecommendBtn = document.getElementById('textRecommendBtn');
const preferencesText = document.getElementById('preferencesText');
const resultsSection = document.getElementById('resultsSection');
const resultsContent = document.getElementById('resultsContent');

// Upload area event listeners
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

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

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelect(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
    }
});

function handleFileSelect(file) {
    if (file.type.startsWith('image/')) {
        // Display file name or preview
        const uploadContent = uploadArea.querySelector('.upload-content');
        uploadContent.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14,2 14,8 20,8"/>
            </svg>
            <p>${file.name}</p>
        `;
        analyzeBtn.disabled = false;
    } else {
        alert('Please select an image file.');
    }
}

// Analyze outfit button
analyzeBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing...';

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8001/analyze-outfit', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayResults(data.recommendations);
    } catch (error) {
        console.error('Error:', error);
        displayResults('Error analyzing outfit. Please try again.');
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = 'Analyze Outfit';
    }
});

// Text recommendation button
textRecommendBtn.addEventListener('click', async () => {
    const preferences = preferencesText.value.trim();
    if (!preferences) {
        alert('Please enter your preferences.');
        return;
    }

    textRecommendBtn.disabled = true;
    textRecommendBtn.textContent = 'Generating...';

    try {
        const response = await fetch('http://localhost:8001/text-recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ preferences })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayResults(data.recommendations);
    } catch (error) {
        console.error('Error:', error);
        displayResults('Error generating recommendations. Please try again.');
    } finally {
        textRecommendBtn.disabled = false;
        textRecommendBtn.textContent = 'Get Recommendations';
    }
});

function displayResults(content) {
    try {
        // Try to parse JSON
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const data = JSON.parse(jsonMatch[0]);
            
            // Create formatted HTML output
            let html = '<div style="background: white; padding: 20px; border-radius: 10px; line-height: 1.8;">';
            
            if (data.description) {
                html += `<div style="margin-bottom: 20px;"><strong style="color: #667eea; font-size: 1.1em;">📋 Description:</strong><p>${data.description}</p></div>`;
            }
            if (data.style) {
                html += `<div style="margin-bottom: 20px;"><strong style="color: #667eea; font-size: 1.1em;">🎨 Style:</strong><p>${data.style}</p></div>`;
            }
            if (data.colors) {
                html += `<div style="margin-bottom: 20px;"><strong style="color: #667eea; font-size: 1.1em;">🌈 Colors:</strong><p>${data.colors}</p></div>`;
            }
            if (data.suggestions) {
                html += `<div style="margin-bottom: 20px;"><strong style="color: #667eea; font-size: 1.1em;">💡 Suggestions:</strong><p>${data.suggestions}</p></div>`;
            }
            if (data.trends) {
                html += `<div style="margin-bottom: 20px;"><strong style="color: #667eea; font-size: 1.1em;">✨ Trends:</strong><p>${data.trends}</p></div>`;
            }
            if (data.occasions) {
                html += `<div style="margin-bottom: 20px;"><strong style="color: #667eea; font-size: 1.1em;">🎉 Occasions:</strong><p>${data.occasions}</p></div>`;
            }
            if (data.outfits) {
                html += `<div style="margin-bottom: 20px;"><strong style="color: #667eea; font-size: 1.1em;">👗 Outfit Ideas:</strong><ul style="margin-left: 20px;">`;
                data.outfits.forEach(outfit => html += `<li>${outfit}</li>`);
                html += `</ul></div>`;
            }
            if (data.accessories) {
                html += `<div style="margin-bottom: 20px;"><strong style="color: #667eea; font-size: 1.1em;">✨ Accessories:</strong><ul style="margin-left: 20px;">`;
                data.accessories.forEach(acc => html += `<li>${acc}</li>`);
                html += `</ul></div>`;
            }
            if (data.tips) {
                html += `<div style="margin-bottom: 20px;"><strong style="color: #667eea; font-size: 1.1em;">📌 Tips:</strong><ul style="margin-left: 20px;">`;
                data.tips.forEach(tip => html += `<li>${tip}</li>`);
                html += `</ul></div>`;
            }
            
            html += '</div>';
            resultsContent.innerHTML = html;
        } else {
            resultsContent.textContent = content;
        }
    } catch (e) {
        resultsContent.textContent = content;
    }
    
    resultsSection.hidden = false;
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}