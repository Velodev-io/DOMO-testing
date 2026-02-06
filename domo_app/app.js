document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const sendBtn = document.getElementById('sendBtn');
    const outputDiv = document.getElementById('output');

    // Configuration - Change this to your deployed server URL in production
    const BACKEND_URL = 'http://127.0.0.1:5000/reverse';

    sendBtn.addEventListener('click', async () => {
        const text = textInput.value;

        if (!text.trim()) {
            return;
        }

        try {
            sendBtn.textContent = 'Sending...';
            sendBtn.disabled = true;

            // Using standard Fetch API
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            // Display result
            outputDiv.textContent = data.result;
            outputDiv.classList.remove('hidden');

            // Animation reset
            outputDiv.classList.remove('visible');
            void outputDiv.offsetWidth; // Force reflow
            outputDiv.classList.add('visible');

        } catch (error) {
            console.error('Error:', error);
            outputDiv.textContent = 'Error connecting to backend.';
            outputDiv.classList.remove('hidden');
            outputDiv.classList.add('visible');
        } finally {
            sendBtn.textContent = 'Send';
            sendBtn.disabled = false;
        }
    });

    // Handle Enter key
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});
