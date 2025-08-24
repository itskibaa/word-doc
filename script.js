document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById('noteInput');
    const saveBtn = document.getElementById('saveBtn');
    const notesList = document.getElementById('notesList');

    let notes = JSON.parse(localStorage.getItem('twitchNotes')) || [];
    renderNotes();

    // Add note
    saveBtn.addEventListener('click', () => {
        const text = noteInput.value.trim();
        if (text) {
            notes.push(text);
            localStorage.setItem('twitchNotes', JSON.stringify(notes));
            renderNotes();
            noteInput.value = '';
        }
    });

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');

            const span = document.createElement('span');
            span.textContent = note;
            span.classList.add('note-text');

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('note-actions');

            // Only Delete button remains
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteNote(index));

            actionsDiv.appendChild(deleteBtn);

            li.appendChild(span);
            li.appendChild(actionsDiv);
            notesList.appendChild(li);
        });
    }

    function deleteNote(index) {
        notes.splice(index, 1); // Delete instantly
        localStorage.setItem('twitchNotes', JSON.stringify(notes));
        renderNotes();
    }
});
