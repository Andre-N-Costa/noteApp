export default class Note {

    /*
    The standard creation of Notes don't receive text, creation date or favorite,
    those fields are given value automatically or during the editing of a note.
    They still appear in the constructor for the recreation of old notes that were stored in the browser
    */
    constructor(noteSection, number, text, creationDate, favorite) {
        this.number = number
        this.noteSection = noteSection
        this.xtraLines = 0;

        if (text) {
            this.text = text
        } else {
            this.text = ""
        }

        if (creationDate) {
            this.creationDate = creationDate
        } else {
            this.creationDate = new Date().toString()
        }

        if (favorite) {
            this.favorite = favorite
        } else {
            this.favorite = false
        }

    }

    get id() {
        return this.number
    }

    set id(x) {
        this.number = x
    }

    get cDate() {
        return this.creationDate
    }

    set cDate(date) {
        this.creationDate = date
    }

    get fav() {
        return this.favorite
    }

    set fav(isFav) {
        this.favorite = isFav
    }

    get txt() {
        return this.text
    }

    set txt(t) {
        this.text = t
    }

    // Replace add box with the note editing text box
    editNote() {
        let NodeForAdd = this.noteSection.querySelector('.add')
        let textBoxArea = this.createEditNoteBox()
        this.noteSection.replaceChild(textBoxArea, NodeForAdd)
    }

    // Replace note with new text
    editOldNote() {
        console.log(this.noteSection)
        let note = this.noteSection.querySelector(`.note_${this.number}`)
        let textBoxArea = this.createEditNoteBox()
        this.noteSection.replaceChild(textBoxArea, note)
    }

    // Creation of the editing text box
    createEditNoteBox() {
        let textBox = document.createElement('textarea')
        textBox.classList.add('note')
        textBox.classList.add('noteWrite')
        let saveButton = document.createElement('button')
        saveButton.classList.add('next')
        saveButton.innerText = 'next'
        let cancelButton = document.createElement('button')
        cancelButton.classList.add('cancel')
        cancelButton.innerText = 'cancel'
        let div = document.createElement('div')
        div.classList.add('edit')
        div.classList.add(`edit_${this.number}`)
        div.appendChild(textBox)
        div.appendChild(saveButton)
        div.appendChild(cancelButton)
        
        return div
    }

    // Send the creation and replacement of notes to its method
    handleNoteCreationAndReplacement() {
        if (this.noteSection.querySelector('.add')){
            if (!this.noteSection.querySelector('.edit')){
                this.loadNote()
            }
            else { 
                this.editNoteContent(false)
            }
        }
        else {
            this.createNote()
        }
        
    }

    handleDateInsertion(){
        let edit = this.noteSection.querySelector('.edit')
        let dateInsert = document.createElement('div')
    }

    // Build the structure of notes loaded from the browser
    loadNote() {
        let note = document.createElement('div')
        let btnPlus = document.createElement('button')
        let btnFav = document.createElement('button')
        let text = document.createElement('p')

        btnPlus.innerText = '...'
        btnPlus.classList.add('plus')

        if (this.favorite){
            btnFav.innerText = '★'
        } else {
            btnFav.innerText = '☆'
        }
        btnFav.classList.add('fav')

        text.classList.add('note-text')

        text.innerHTML = this.text

        note.appendChild(btnPlus)
        note.appendChild(btnFav)
        note.appendChild(text)
        
        note.classList.add('note')
        note.classList.add(`note_${this.number}`)

        this.noteSection.appendChild(note)
    }

    // Action for the button that cancels the editing of a note 
    cancelEdit() {
        if (this.noteSection.querySelector('.add')){
            this.editNoteContent(true)
        }
        else {
            let edit = this.noteSection.querySelector('.edit')
            let addButton = document.createElement('button')
            addButton.classList.add('add')
            addButton.innerText = '+'

            this.noteSection.replaceChild(addButton, edit)
        }
        
    }

    // A new note structure is created and put in place 
    createNote() {
        let note = document.createElement('div')
        let notes = this.noteSection.querySelectorAll('.note')
        let edit = this.noteSection.querySelector('.edit')
        let textBox = edit.querySelector('.noteWrite').value
        let text = document.createElement('p')

        let btnPlus = document.createElement('button')
        let btnFav = document.createElement('button')

        btnPlus.innerText = '...'
        btnPlus.classList.add('plus')

        if (this.favorite){
            btnFav.innerText = '★'
        } else {
            btnFav.innerText = '☆'
        }
        btnFav.classList.add('fav')

        text.classList.add('note-text')

        this.text = textBox
        text.innerHTML = textBox

        note.appendChild(btnPlus)
        note.appendChild(btnFav)
        note.appendChild(text)

        note.classList.add('note')
        note.classList.add(`note_${notes.length-1}`)
        
        this.noteSection.appendChild(note)

        let addButton = document.createElement('button')
        addButton.classList.add('add')
        addButton.innerText = '+'

        this.noteSection.replaceChild(addButton, edit)

    }

    editNoteContent(isCanceled){
        let note = document.createElement('div')
        let edit = this.noteSection.querySelector('.edit')
        let textBox = edit.querySelector('.noteWrite').value
        let text = document.createElement('p')

        let btnPlus = document.createElement('button')
        let btnFav = document.createElement('button')

        btnPlus.innerText = '...'
        btnPlus.classList.add('plus')

        if (this.favorite){
            btnFav.innerText = '★'
        } else {
            btnFav.innerText = '☆'
        }
        btnFav.classList.add('fav')

        text.classList.add('note-text')

        if (!isCanceled){
            this.text = textBox
            text.innerHTML = textBox
        }
        else {
            text.innerHTML = this.text
        }
        

        note.appendChild(btnPlus)
        note.appendChild(btnFav)
        note.appendChild(text)

        note.classList.add('note')
        note.classList.add(`note_${this.number}`)

        this.noteSection.replaceChild(note, edit)
    }

    openSettings(){
        let body = document.querySelector('body')
        let div = document.createElement('div')
        let btnEdit = document.createElement('button')
        let btnDelete = document.createElement('button')

        btnEdit.classList.add('setting')
        btnEdit.classList.add('editNote')
        btnEdit.innerText = 'edit'

        btnDelete.classList.add('setting')
        btnDelete.classList.add('deleteNote')
        btnDelete.innerText = 'delete'

        div.classList.add('settings')

        div.appendChild(btnEdit)
        div.appendChild(btnDelete)

        body.appendChild(div)
    }

    removePlusBtn(){
        let note = this.noteSection.querySelector(`.note_${this.number}`)
        let btnPlus = note.querySelector('.plus')
        note.removeChild(btnPlus)
    }



}