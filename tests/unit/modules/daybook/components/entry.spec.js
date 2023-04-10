import { shallowMount } from "@vue/test-utils";

import Entry from '@/modules/daybook/components/EntryComponent';
import { journalState } from "../../../mock-data/test-journal-state";

describe('Test on Entry Component', () => {

    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount(Entry, {
        global:{
            mocks: {
                $router: mockRouter
            }
        },
        props: {
            entry: journalState.entries[1]
        }
    })

    test('must be equal to the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('must redirect on click to the entry-container', () => {

        const entryConatiner = wrapper.find('.entry-container')
        entryConatiner.trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith({
            name: "entry",
            params: {
                id: journalState.entries[1].id
            }
        })
    })

    test('test on properties computed', () => {

        expect( wrapper.vm.day ).toBe(26)
        expect( wrapper.vm.month ).toBe('Marzo')
        expect( wrapper.vm.yearDay ).toBe('2023, Domingo')
    })
})