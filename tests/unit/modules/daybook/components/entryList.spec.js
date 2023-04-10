import { createStore } from "vuex"
import { shallowMount } from "@vue/test-utils";

import EntryList from '@/modules/daybook/components/EntryList';
import { journalState } from '../../../mock-data/test-journal-state';
import journal from '@/modules/daybook/store/journal';

const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Test in the EntryList', () => {
    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }
    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })

    test('must call the entriesByTerm and show two entries', () => {

        expect( wrapper.html() ).toMatchSnapshot()
        expect( wrapper.findAll('entry-stub').length ).toBe(2)
    })

    test('must call the getEntriesByTerm and filter using the entries', async () => {
        const input = wrapper.find('input')
        await input.setValue('hard')

        expect(wrapper.findAll('entry-stub').length).toBe(1)
    })

    test('the buttton "New" must redirect to /new', () => {
        wrapper.find('button').trigger('click')
        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'entry', params:{ id: 'new' } })
    })
})