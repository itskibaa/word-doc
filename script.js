const textarea = document.getElementById('notepad');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const themeBtn = document.getElementById('themeBtn');

// Helper to load configuration
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

// Save notes (streamer + mods)
saveBtn.addEventListener('click', () => {
  const content = { notes: textarea.value };
  window.Twitch.ext.configuration.set('broadcaster', '1.0', JSON.stringify(content), err => {
    if (err) console.error('Error saving notes:', err);
  });
});

// Clear notes
clearBtn.addEventListener('click', () => {
  textarea.value = "";
  // Save empty notes to Twitch config
  window.Twitch.ext.configuration.set('broadcaster', '1.0', JSON.stringify({ notes: "" }), err => {
    if (err) console.error('Error clearing notes:', err);
  });
});

// Toggle theme
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Load notes (anyone can read)
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
