// Update the available voices based on the selected language
function updateVoiceOptions() {
    const language = document.getElementById('language');
    const speaker1 = document.getElementById('speaker1');
    const speaker2 = document.getElementById('speaker2');

    if (!language || !speaker1 || !speaker2) {
        console.error('Required elements not found in the DOM');
        return;
    }

    let options = '';
    switch (language.value) {
        case 'en-US':
            options = `
                <option value="en-US-AvaMultilingualNeural">Ava</option>
                <option value="en-US-AndrewMultilingualNeural">Andrew</option>
                <option value="en-US-EmmaMultilingualNeural">Emma</option>
                <option value="en-US-BrianMultilingualNeural">Brian</option>
            `;
            break;
        case 'de-DE':
            options = `
                <option value="de-DE-FlorianMultilingualNeural">Florian</option>
                <option value="de-DE-SeraphinaMultilingualNeural">Seraphina</option>
            `;
            break;
        case 'fr-FR':
            options = `
                <option value="fr-FR-RemyMultilingualNeural">Remy</option>
                <option value="fr-FR-VivienneMultilingualNeural">Vivienne</option>
            `;
            break;
        case 'it-IT':
            options = `
                <option value="it-IT-ElsaNeural">Elsa</option>
                <option value="it-IT-DiegoNeural">Diego</option>
            `;
            break;
        case 'pt-BR':
            options = `
                <option value="pt-BR-FranciscaNeural">Francisca</option>
                <option value="pt-BR-AntonioNeural">Antonio</option>
            `;
            break;
        case 'es-ES':
            options = `
                <option value="en-US-AvaMultilingualNeural">Ava</option>
                <option value="es-ES-AlvaroNeural">Alvaro</option>
            `;
            break;
        default:
            options = '';
    }

    speaker1.innerHTML = options;
    speaker2.innerHTML = options;

    // Select different default options for speaker1 and speaker2
    if (speaker1.options.length > 0) {
        speaker1.selectedIndex = 0;
        if (speaker2.options.length > 1) {
            speaker2.selectedIndex = 1;
        }
    }

    // Update the voice selection to prevent duplicates
    updateVoiceSelection();
}

// Prevent selecting the same voice for both speakers
function preventDuplicateSelection(selectors) {
    const values = selectors.map((select) => select.value);

    selectors.forEach((currentSelect, index) => {
        Array.from(currentSelect.options).forEach((option) => {
            option.disabled = values.includes(option.value) && option.value !== currentSelect.value;
        });
    });
}

function updateVoiceSelection() {
    const speaker1 = document.getElementById('speaker1');
    const speaker2 = document.getElementById('speaker2');

    if (speaker1 && speaker2) {
        preventDuplicateSelection([speaker1, speaker2]);
    }
}

// Initialize voice options on page load
document.addEventListener('DOMContentLoaded', function () {
    const languageSelector = document.getElementById('language');
    if (languageSelector) {
        languageSelector.addEventListener('change', updateVoiceOptions);
    }
    updateVoiceOptions();

    // Add event listeners for change in speaker selections
    document.addEventListener('change', function (event) {
        if (event.target.matches('#speaker1') || event.target.matches('#speaker2')) {
            updateVoiceSelection();
        }
    });
});
