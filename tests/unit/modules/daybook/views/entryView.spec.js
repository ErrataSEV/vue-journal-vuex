import { createStore } from "vuex"
import { shallowMount } from "@vue/test-utils";

import Swal from "sweetalert2";

import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../mock-data/test-journal-state';

import EntryView from '@/modules/daybook/views/EntryView';

const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Test on EntryView', () => {

    const store = createVuexStore(journalState)
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }
    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-NRUTjCltIHNFHZB1z-h'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })

    test('must redirct the user to new ', () => {
        const wrapper = shallowMount( EntryView, {
            props: {
                id: 'Este ID no existe en el STORE'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ],
            }
        })

        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })
    })

    test('must show the correct entry', () => {
        expect( wrapper.html() ).toMatchSnapshot()
        expect( mockRouter.push ).not.toHaveBeenCalled()
    })

    test('must delete the entry and exit', async () => {

        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) )

        await wrapper.find('.btn-danger').trigger('click')

        expect( Swal.fire ).toHaveBeenCalledWith({
            title: 'Are you sure to delete?',
            text: 'Once removed, you can\'t recovery',
            showDenyButton: true,
            confirmButtonText: 'Yes, I\'m sure'
        })

        expect( store.dispatch ).toHaveBeenCalledWith("journal/deleteEntry", "-NRUTjCltIHNFHZB1z-h")
        expect( mockRouter.push ).toHaveBeenCalled()
    })
})