document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById('noteInput');
    const saveBtn = document.getElementById('saveBtn');
    const notesList = document.getElementById('notesList');

    let notes = JSON.parse(localStorage.getItem('twitchNotes')) || [];
    renderNotes();

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

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editNote(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteNote(index));

            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);

            li.appendChild(span);
            li.appendChild(actionsDiv);
            notesList.appendChild(li);
        });
    }

    function editNote(index) {
        const newNote = prompt('Edit your note:', notes[index]);
        if (newNote !== null && newNote.trim() !== '') {
            notes[index] = newNote.trim();
            localStorage.setItem('twitchNotes', JSON.stringify(notes));
            renderNotes();
        }
    }

    function deleteNote(index) {
        if (confirm('Are you sure you want to delete this note?')) {
            notes.splice(index, 1);
            localStorage.setItem('twitchNotes', JSON.stringify(notes));
            renderNotes();
        }
    }
});
