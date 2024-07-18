import Note from './notes.js'

let noteSection = document.querySelector('.notes')
let currentNote
let noteArray = []
const pos = { x : 0, y : 0 };


loadNotes()



document.addEventListener('click', function(e){
    console.log(noteArray)
    const target = e.target
    replaceSettings()
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
    // Open settings of a note
    if (target.classList.contains('plus')){
        let note_index = target.parentNode.classList[1][5]
        currentNote = noteArray[note_index]
        saveCursorPosition(e.clientX, e.clientY)
        currentNote.removePlusBtn()
        if (!document.querySelector('body').querySelector('.settings')){
            currentNote.openSettings()
        }
    }
    // Delete a note
    if (target.classList.contains('deleteNote')){
        noteArray.splice(currentNote.number,1)
        saveNotes()
        location.reload()
    }

    // Edit a note
    if (target.classList.contains('editNote')){
        currentNote.editOldNote()
    }
})

document.addEventListener('keydown', function(e){
    // Instead of clicking in 'save' button, its possible to press enter while editing
    if (e.keyCode == '13' && noteSection.querySelector('.edit')){
        currentNote.handleNoteCreationAndReplacement()
        noteArray[currentNote.id] = currentNote
        saveNotes()
    }
})

function saveCursorPosition(x, y) {
    pos.x = x;
    pos.y = y;
    console.log("posx ", pos.x, " posy ", pos.y)
    document.documentElement.style.setProperty('--x', pos.x);
    document.documentElement.style.setProperty('--y', pos.y);
}

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
            if (note){
                readNote(note)
            }
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

// Remove settings window and put all place all settings buttons
function replaceSettings(){
    let body = document.querySelector('body')

    if (body.querySelector('.settings')){    
        let settings = body.querySelector('.settings')
        console.log(body)
        body.removeChild(settings)
    }
    

    let notes = noteSection.querySelectorAll('.note')

    for (let note of notes){
        if (!note.querySelector('.plus')){
            let btnPlus = document.createElement('button')

            btnPlus.innerText = '...'
            btnPlus.classList.add('plus')

            note.insertBefore(btnPlus,note.children[0])
        }
        
    }

    
}
