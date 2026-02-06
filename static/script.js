document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const reverseBtn = document.getElementById('reverseBtn');
    const outputDiv = document.getElementById('output');

    reverseBtn.addEventListener('click', async () => {
        const text = textInput.value;

        if (!text.trim()) {
            // Shake input if empty
            textInput.style.transform = 'translateX(5px)';
            setTimeout(() => textInput.style.transform = 'translateX(0)', 100);
            setTimeout(() => textInput.style.transform = 'translateX(-5px)', 200);
            setTimeout(() => textInput.style.transform = 'translateX(0)', 300);
            return;
        }

        try {
            reverseBtn.textContent = 'Reversing...';
            reverseBtn.disabled = true;

            const response = await fetch('/reverse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });

            const data = await response.json();

            // Display result
            outputDiv.textContent = data.result;
            outputDiv.classList.remove('hidden');

            // Trigger animation: Remove class if exists to restart animation
            outputDiv.classList.remove('visible');
            outputDiv.classList.remove('flash');

            // Force reflow
            void outputDiv.offsetWidth;

            outputDiv.classList.add('visible');
            outputDiv.classList.add('flash');

        } catch (error) {
            console.error('Error:', error);
            outputDiv.textContent = 'An error occurred. Please try again.';
            outputDiv.classList.add('visible');
        } finally {
            reverseBtn.textContent = 'Reverse';
            reverseBtn.disabled = false;
        }
    });

    // Also trigger on Enter key
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            reverseBtn.click();
        }
    });
});
