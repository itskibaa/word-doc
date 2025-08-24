const textarea = document.getElementById('notepad');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const themeBtn = document.getElementById('themeBtn');
const container = document.getElementById('notepad-container');

// Load notes from Twitch configuration
function loadNotes() {
    window.Twitch.ext.configuration.get('broadcaster', (err, config) => {
        if (err) {
            console.error('Error loading configuration:', err);
            return;
        }
        const saved = config?.content?.notes || "";
        textarea.value = saved;
    });
}

// Wait for Twitch extension to be authorized
window.Twitch.ext.onAuthorized((auth) => {
    console.log('Twitch extension authorized!', auth);

    loadNotes();

    // Save notes
    saveBtn.addEventListener('click', () => {
        const content = { notes: textarea.value };
        window.Twitch.ext.configuration.set('broadcaster', '1.0', JSON.stringify(content), err => {
            if (err) console.error('Error saving notes:', err);
        });
    });

    // Clear notes
    clearBtn.addEventListener('click', () => {
        textarea.value = "";
        window.Twitch.ext.configuration.set('broadcaster', '1.0', JSON.stringify({ notes: "" }), err => {
            if (err) console.error('Error clearing notes:', err);
        });
    });

    // Toggle dark/light theme
    themeBtn.addEventListener('click', () => {
        container.classList.toggle('dark');
    });
});
