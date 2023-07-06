import { NoteService } from '../../services/notes/NoteService.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


import NoteList from '../../cmps/notes/NoteList.js'
import NoteAdd from '../../cmps/notes/NoteAdd.js'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'

export default {
    name: 'NoteIndex',
    props: [],
    template: `
        <section class="note-index">
            <NoteAdd
            @create="saveNewNote"
            />

            <NoteList
            :notes="notes"
            @remove="removeNote"
            />
            
        </section>
        `,
    created() {

        NoteService.getNotesFromService()
            .then(notes => {
            this.notes = notes
            if(!this.notes || !this.notes.length){
            NoteService.query()
            .then(notes => {
                this.notes = notes
           })}})
               
              
            }
        ,
    data() {
        return {
            notes: [],
        }
    },
    methods: {
        saveNewNote(note) {
            // note.info.txt = txt
            // note.type = type
            // console.log(note)
            NoteService.save(note)
                .then(savedNote => {
                    this.notes.push(savedNote)
                    console.log(this.notes)
                })
            // showSuccessMsg('Note saved!')
            //    NoteService.crateNote('NoteTxt', txt)
            //         .then(notes => this.notes = notes)
            //         console.log(this.notes)
        },
        removeNote(noteId) {
            NoteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    showSuccessMsg('Nore removed')
                })
                .catch(err => {
                    console.log(noteId)
                    // NoteService.removeFromHardCodedList(noteId)
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                })
        },

    },
    computed: {
        getNotes() {
            return this.notes
        },
    },
    components: {
        NoteList,
        NoteAdd,
    },
}
