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
    if (target.classList.contains('next')){
        if (noteSection.querySelector('.add')){
            let note_index = target.parentNode.classList[1].substring(5)
            currentNote = noteArray[note_index]
        }
        /*
         * Add a method to open a insert date window in the edit window place
        */
        currentNote.handleDateInsertion()
        currentNote.handleNoteCreationAndReplacement()
        noteArray[currentNote.id] = currentNote
        saveNotes()
    }
    // Cancel note creation/editing
    if (target.classList.contains('cancel')){
        console.log(target.parentNode.classList)
        if (noteSection.querySelector('.add')){
            let note_index = target.parentNode.classList[1].substring(5)
            currentNote = noteArray[note_index]
        }
        
        currentNote.cancelEdit()
    }
    // Open settings of a note
    if (target.classList.contains('plus')){
        let note_index = target.parentNode.classList[1].substring(5)
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
        let textBoxArea = noteSection.querySelector('.edit').querySelector('.noteWrite')
        textBoxArea.value = currentNote.text
        textBoxArea.focus()
        
    }

    // Favorite a note (highlight it)
    if (target.classList.contains('fav')){
        let note_index = target.parentNode.classList[1].substring(5)
        currentNote = noteArray[note_index]
        console.log(noteArray)
        console.log(note_index)
        console.log(currentNote)
        currentNote.fav = !currentNote.fav
        if (currentNote.fav){
            target.innerText = '★'
        }
        else{
            target.innerText = '☆'
        }
        saveNotes()
        location.reload()
    }

    if (target.classList.contains('note-text')) {
        let note_index = target.parentNode.classList[1].substring(5)
        currentNote = noteArray[note_index]
        let xtraLines = calcXtraLines(target)
        
        if (document.documentElement.style.getPropertyValue('--xtraLines') == 0){
            document.documentElement.style.setProperty('--xtraLines', xtraLines)
        } else {
            document.documentElement.style.setProperty('--xtraLines', 0)
        }
        
    }
})

document.addEventListener('mouseover', function(e){
    const target = e.target
    if (!target.classList.contains('note-text')){
        document.documentElement.style.setProperty('--xtraLines', 0);
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

    // Get the scroll position
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    pos.x = x + scrollX;
    pos.y = y + scrollY;

    console.log("posx ", pos.x, " posy ", pos.y)
    document.documentElement.style.setProperty('--x', pos.x);
    document.documentElement.style.setProperty('--y', pos.y);
}

function calcXtraLines(target) {
    let lineNumber
    let xtraLines
    lineNumber = Math.floor(target.getBoundingClientRect().height.toFixed(2) / 24)
    console.log(lineNumber)
    if (lineNumber > 3){
        xtraLines = lineNumber - 4
    }
    else{
        xtraLines = 0
    }

    return xtraLines
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

    const favorites = newNotesList.reduce((acc, note) =>{
        if (note.favorite) acc.push(note)
        return acc
    },[])
    
    const notFavorites = newNotesList.reduce((acc, note) =>{
        if (!note.favorite) acc.push(note)
        return acc
    },[])
    
    let i = 0

    if (newNotesList){
        for (let note of favorites){
            if (note){
                readNote(note, i)
                i++
            }
        }
        for (let note of notFavorites){
            if (note){
                readNote(note, i)
                i++
            }
        }
    }
}

// Process notes loaded from browser
function readNote(note, number){
    let newNote = new Note(noteSection, number, note.text, note.creationDate, note.favorite)
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
