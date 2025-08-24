const textarea = document.getElementById('notepad');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const themeBtn = document.getElementById('themeBtn');
const container = document.getElementById('notepad-container');
const title = document.getElementById('panel-title');

let isTwitch = !!window.Twitch?.ext;

// Update header with last saved time
function updateTitleWithTimestamp() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    title.textContent = `Stream Notes (Last saved at ${hours}:${minutes})`;
}

// Load notes from Twitch or localStorage
function loadNotes() {
    if (isTwitch) {
        window.Twitch.ext.configuration.get('broadcaster', (err, config) => {
            if (err) {
                console.error('Error loading configuration:', err);
                return;
            }
            const saved = config?.content?.notes || "";
            textarea.value = saved;
            console.log("Loaded notes from Twitch config:", saved);
        });
    } else {
        const saved = localStorage.getItem('notes') || '';
        textarea.value = saved;
        console.log("Loaded notes from localStorage:", saved);
    }
}

// Save notes
function saveNotes() {
    if (isTwitch) {
        const content = { notes: textarea.value };
        window.Twitch.ext.configuration.set('broadcaster', '1.0', JSON.stringify(content), err => {
            if (err) console.error('Error saving notes:', err);
            else {
                console.log('Notes saved to Twitch config');
                updateTitleWithTimestamp();
            }
        });
    } else {
        localStorage.setItem('notes', textarea.value);
        console.log("Notes saved to localStorage");
        updateTitleWithTimestamp();
    }
}

// Clear notes
function clearNotes() {
    textarea.value = "";
    if (isTwitch) {
        window.Twitch.ext.configuration.set('broadcaster', '1.0', JSON.stringify({ notes: "" }), err => {
            if (err) console.error('Error clearing notes:', err);
            else {
                console.log('Notes cleared in Twitch config');
                updateTitleWithTimestamp();
            }
        });
    } else {
        localStorage.removeItem('notes');
        console.log("Notes cleared from localStorage");
        updateTitleWithTimestamp();
    }
}

// Toggle theme
function toggleTheme() {
    container.classList.toggle('dark');
    console.log("Theme toggled");
}

// Attach listeners safely
function attachEventListeners() {
    saveBtn.addEventListener('click', saveNotes);
    clearBtn.addEventListener('click', clearNotes);
    themeBtn.addEventListener('click', toggleTheme);
}

// Initialize extension
if (isTwitch) {
    window.Twitch.ext.onAuthorized((auth) => {
        console.log('Twitch extension authorized!', auth);
        loadNotes();
        attachEventListeners();
    });
} else {
    console.log("Running outside Twitch - using localStorage for testing");
    loadNotes();
    attachEventListeners();
}
