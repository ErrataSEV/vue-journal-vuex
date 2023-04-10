import { shallowMount } from "@vue/test-utils"
import Fab from '@/modules/daybook/components/FabComponent';

describe('Pruebas en el FAB Component', () => {
    test('debe mostrar el icon por defecto', () => {
        //fa-plus
        const wrapper = shallowMount( Fab )
        expect(wrapper.find('i').classes()).toContain('fa-plus')
    })
    
    test('debe mostrar el icon por argumento: fa-circle', () => {
        
        const wrapper = shallowMount( Fab, {
            props: {
                icon: 'fa-circle'
            }
        } )
        expect(wrapper.find('i').classes('fa-circle')).toBeTruthy()

    })

    test('debe emitir el evento on:click cuando se hace click', () => {

        const wrapper = shallowMount( Fab )
        
        wrapper.find('button').trigger('click')

        expect(wrapper.emitted('on:click')).toHaveLength(1)

    })
})