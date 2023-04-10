import { createStore } from "vuex"
import journal from '@/modules/daybook/store/journal';
import { journalState } from "../../../../mock-data/test-journal-state";
import store from "@/store";


const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Vuex - Pruebas en el Journal Module', () => {

    // Basics
    test('este es el estado inicial, debe tener este state', () => {
        const store = createVuexStore( journalState )

        const { isLoading, entries } = store.state.journal

        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )
    })

    // Mutations
    test('mutations: setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: [] })
        
        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    })

    test('mutation: updateEntry', () => {
        const store = createVuexStore( journalState )

        const updateEntry = {
            id: "-NRUTjCltIHNFHZB1z-h",
            date: 1679860326792,
            picture: "https://res.cloudinary.com/dsn8cnadp/image/upload/v1679864883/curso-vue/hfedsy8zfyp5lxulkk9a.jpg",
            text: "Hello world from test"
        }

        store.commit('journal/updateEntry', updateEntry)

        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.entries.find( entry => entry.id===updateEntry.id) ).toEqual(updateEntry)
    })

    test('mutation: addEntry and removeEntry', () => {
        const store = createVuexStore( journalState )
        
        const newEntry = {
            id: 'ABC-123',
            text: 'Hi test world'
        }

        store.commit('journal/addEntry', newEntry)
        const entries = store.state.journal.entries

        expect( entries.length ).toBe(3)
        expect( entries[0] ).toEqual(newEntry)

        store.commit('journal/removeEntry', newEntry.id)

        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.entries.find(e => e.id === newEntry.id) ).toBeUndefined()
    })

    // Getters
    test('getters: getEntriesByTerm and getEntryById', () => {
        const store = createVuexStore( journalState )
        const [ entry1, entry2 ] = journalState.entries

        expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(2)
        expect( store.getters['journal/getEntriesByTerm']('hardcoded').length ).toBe(1)
        expect( store.getters['journal/getEntriesByTerm']('hardcoded') ).toEqual([ entry1 ])
        expect( store.getters['journal/getEntryById']('-NRUTjCltIHNFHZB1z-h') ).toEqual(entry2)
    })

    // Actions
    test('actions: loadEntries', async () => {
        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(1)
    })
    
    test('actions: updateEntry', async () => {
        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: '-NRUTjCltIHNFHZB1z-h',
            date: 1679860326792,
            picture: "https://res.cloudinary.com/dsn8cnadp/image/upload/v1679864883/curso-vue/hfedsy8zfyp5lxulkk9a.jpg",
            text: "Hi from action tests"
        }

        await store.dispatch('journal/updateEntry', updatedEntry)

        expect( store.state.journal.entries.find( e => e.id === updatedEntry.id) ).toEqual( updatedEntry )
    })

    test('actions: createEntry and deleteEntry', async () => {
        const store = createVuexStore({ isLoading: true, entries: [] })

        const newEntry = { date:16798603268492, text: 'New entry from tests' }
        const id = await store.dispatch('journal/createEntry', newEntry)

        expect( typeof id ).toBe('string')
        expect( store.state.journal.entries.find( e => e.id === id ) ).toBeDefined()

        await store.dispatch('journal/deleteEntry', id)

        expect( store.state.journal.entries.find( e => e.id === id) ).toBeUndefined()
    })
})