const textarea = document.getElementById('notepad');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const themeBtn = document.getElementById('themeBtn');
const container = document.getElementById('notepad-container');

let isTwitch = !!window.Twitch?.ext;

// -----------------------------
// Load notes function
// -----------------------------
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
        // Browser fallback for testing
        const saved = localStorage.getItem('notes') || '';
        textarea.value = saved;
        console.log("Loaded notes from localStorage:", saved);
    }
}

// -----------------------------
// Save notes function
// -----------------------------
function saveNotes() {
    if (isTwitch) {
        const content = { notes: textarea.value };
        window.Twitch.ext.configuration.set('broadcaster', '1.0', JSON.stringify(content), err => {
            if (err) console.error('Error saving notes:', err);
            else console.log('Notes saved successfully to Twitch config!');
        });
    } else {
        localStorage.setItem('notes', textarea.value);
        console.log("Notes saved to localStorage for testing");
    }
}

// -----------------------------
// Clear notes function
// -----------------------------
function clearNotes() {
    textarea.value = "";
    if (isTwitch) {
        window.Twitch.ext.configuration.set('broadcaster', '1.0', JSON.stringify({ notes: "" }), err => {
            if (err) console.error('Error clearing notes:', err);
            else console.log('Notes cleared in Twitch config!');
        });
    } else {
        localStorage.removeItem('notes');
        console.log("Notes cleared from localStorage for testing");
    }
}

// -----------------------------
// Dark mode toggle
// -----------------------------
function toggleTheme() {
    container.classList.toggle('dark');
    console.log("Theme toggled");
}

// -----------------------------
// Event listeners
// -----------------------------
saveBtn.addEventListener('click', saveNotes);
clearBtn.addEventListener('click', clearNotes);
themeBtn.addEventListener('click', toggleTheme);

// -----------------------------
// Twitch authorization or direct load
// -----------------------------
if (isTwitch) {
    window.Twitch.ext.onAuthorized((auth) => {
        console.log('Twitch extension authorized!', auth);
        loadNotes();
    });
} else {
    console.log("Running outside Twitch - using localStorage for testing");
    loadNotes();
}
