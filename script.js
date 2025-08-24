document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById('noteInput');
    const notesList = document.getElementById('notesList');

    // Load notes from localStorage or start empty
    let notes = JSON.parse(localStorage.getItem('twitchNotes')) || [];
    renderNotes();

    // Add a new note when pressing Enter
    noteInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // prevent newline
            const text = noteInput.value.trim();
            if (text) {
                notes.push(text);
                localStorage.setItem('twitchNotes', JSON.stringify(notes));
                renderNotes();
                noteInput.value = '';
            }
        }
    });

    // Render all notes
    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');

            const span = document.createElement('span');
            span.textContent = note;
            span.classList.add('note-text');

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('note-actions');

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteNote(index));

            actionsDiv.appendChild(deleteBtn);

            li.appendChild(span);
            li.appendChild(actionsDiv);
            notesList.appendChild(li);
        });
    }

    // Delete a specific note instantly
    function deleteNote(index) {
        notes.splice(index, 1);
        localStorage.setItem('twitchNotes', JSON.stringify(notes));
        renderNotes();
    }
});
