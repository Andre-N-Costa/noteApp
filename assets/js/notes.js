export default class Note {

    /*
    The standard creation of Notes don't receive text, creation date or favorite,
    those fields are given value automatically or during the editing of a note.
    They still appear in the constructor for the recreation of old notes that were stored in the browser
    */
    constructor(noteSection, number, text, creationDate, favorite) {
        this.number = number
        this.noteSection = noteSection

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

    // Creation of the editing text box
    createEditNoteBox() {
        let textBox = document.createElement('textarea')
        textBox.classList.add('note')
        textBox.classList.add('noteWrite')
        let saveButton = document.createElement('button')
        saveButton.classList.add('save')
        saveButton.innerText = 'save'
        let cancelButton = document.createElement('button')
        cancelButton.classList.add('cancel')
        cancelButton.innerText = 'cancel'
        let div = document.createElement('div')
        div.classList.add('edit')
        div.appendChild(textBox)
        div.appendChild(saveButton)
        div.appendChild(cancelButton)
        
        return div
    }

    // Send the creation and replacement of notes to the specific method
    handleNoteCreationAndReplacement() {
        if (!this.noteSection.querySelector('.edit')){
            console.log("LOADING")
            this.loadNote()
        }
        else { 
            console.log("CREATING")
            this.createNote()
        }
    }

    // Build the structure of notes loaded from the browser
    loadNote() {
        let note = document.createElement('div')
        let btnPlus = document.createElement('button')
        let btnFav = document.createElement('button')

        btnPlus.innerText = '...'

        if (this.favorite){
            btnFav.innerText = '★'
        } else {
            btnFav.innerText = '☆'
        }
        

        note.classList.add('note')
        note.classList.add(`note_${this.number}`)

        note.appendChild(btnPlus)
        note.appendChild(btnFav)

        note.innerText = this.text

        console.log(this.noteSection)

        this.noteSection.appendChild(note)
    }

    // Action for the button that cancels the editing of a note 
    cancelEdit() {
        let edit = this.noteSection.querySelector('.edit')
        let addButton = document.createElement('button')
        addButton.classList.add('add')
        addButton.innerText = '+'

        this.noteSection.replaceChild(addButton, edit)
    }

    // A new note structure is created and put in place 
    createNote() {
        let note = document.createElement('div')
        let notes = this.noteSection.querySelectorAll('.note')
        let edit = this.noteSection.querySelector('.edit')
        let textBox = edit.querySelector('.noteWrite').value

        let btnPlus = document.createElement('button')
        let btnFav = document.createElement('button')

        btnPlus.innerText = '...'

        if (this.favorite){
            btnFav.innerText = '★'
        } else {
            btnFav.innerText = '☆'
        }

        note.appendChild(btnPlus)
        note.appendChild(btnFav)

        this.text = textBox

        note.classList.add('note')
        note.classList.add(`note_${notes.length}`)
        note.innerText = textBox

        this.noteSection.appendChild(note)

        let addButton = document.createElement('button')
        addButton.classList.add('add')
        addButton.innerText = '+'

        this.noteSection.replaceChild(addButton, edit)

    }


}