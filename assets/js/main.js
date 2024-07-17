import Note from './notes.js'

let noteSection = document.querySelector('.notes')
let currentNote
let noteArray = []


loadNotes()

document.addEventListener('click', function(e){
    console.log(noteArray)
    const target = e.target
    // Add new note
    if (target.classList.contains('add')){
        currentNote = new Note(noteSection, noteArray.length)
        currentNote.editNote()
        let textBoxArea = noteSection.querySelector('.edit').querySelector('.noteWrite')
        textBoxArea.focus()
    }
    // Save note creation/editing
    if (target.classList.contains('save')){
        currentNote.handleNoteCreationAndReplacement()
        noteArray[currentNote.id] = currentNote
        saveNotes()
    }
    // Cancel note creation/editing
    if (target.classList.contains('cancel')){
        currentNote.cancelEdit()
    }
})

// Save notes in browser
function saveNotes(){
    const notesJSON = JSON.stringify(noteArray)
    localStorage.setItem('notes', notesJSON)
}

// Load notes from browser
function loadNotes(){
    const notes = localStorage.getItem('notes')
    const newNotesList = JSON.parse(notes)

    console.log(newNotesList)
    if (newNotesList){
        for (let note of newNotesList){
            readNote(note)
        }
    }

}

// Process notes loaded from browser
function readNote(note){
    let newNote = new Note(noteSection, note.number, note.text, note.creationDate, note.favorite)
    currentNote = newNote
    noteArray[currentNote.id] = currentNote
    currentNote.handleNoteCreationAndReplacement()
}

