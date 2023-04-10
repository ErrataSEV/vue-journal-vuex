import axios from "axios";
import 'setImmediate';
import cloudinary from 'cloudinary';

import uploadImage from "@/modules/daybook/helpers/uploadImage";

cloudinary.config({
    cloud_name: 'dsn8cnadp',
    api_key: '764257661652512',
    api_secret: 'iNAJLOPMsZbfbU9YmqEzgVIzeIE'
})

describe('Pruebas en el uploadImage helper', ( ) => {

    test('must upload a file and return the URL to access', async () => {
        const { data } = await axios.get('https://res.cloudinary.com/dsn8cnadp/image/upload/v1679864816/curso-vue/gyom5juixqzopwhmzyak.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([data], 'foto.jpg')

        const url = await uploadImage(file)

        expect( typeof url ).toBe('string')

        const segments = url.split('/')
        const imageId = 'curso-vue/'+segments[ segments.length-1 ].replace('.jpg', '')
        
        const res = await cloudinary.v2.api.delete_resources( imageId )
        
    })
})