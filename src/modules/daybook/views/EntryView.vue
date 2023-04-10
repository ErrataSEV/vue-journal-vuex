<template>

    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{ day }}</span>
                <span class="mx-1 fs-3">{{ month }}</span>
                <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
            </div>
            
            <div>
                <input type="file" @change="onSelectedImage" accept="image/*" ref="imageSelector" v-show="false">
                <button class="btn btn-danger mx-2" @click="onDeleteEntry" v-if="entry.id">
                    Delete
                    <i class="fa fa-trash-alt">
                    </i>
                </button>
                <button class="btn btn-primary" @click="onSelectImage">
                    Upload
                    <i class="fa fa-upload">
                    </i>
                </button>
            </div>
        </div>
        
        <hr>
        
        <div class="d-flex flex-column px-3 h-75">
            <textarea placeholder="What happened today?" v-model="entry.text"></textarea>
        </div>
        
        <img
            v-if="localImage"
            :src="localImage"
            alt="entry-picture"
            class="img-thumbnail"
        >
        <img v-if="entry.picture && !localImage" :src="entry.picture" alt="entry-picture" class="img-thumbnail">
    
    </template>

    <Fab icon="fa-save" @on:click="saveEntry"></Fab>
    
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Swal from 'sweetalert2';

import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from '@/modules/daybook/helpers/uploadImage';

export default {
    name: 'EntryView',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            entry: null,
            file: null,
            localImage: null
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/FabComponent.vue'))
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        day() {
            const { day } = getDayMonthYear(this.entry.date)
            return day
        },
        month() {
            const { month } = getDayMonthYear(this.entry.date)
            return month
        },
        yearDay() {
            const { yearDay } = getDayMonthYear(this.entry.date)
            return yearDay
        },

    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry() {
            let entry = {}
            if (this.id === 'new') {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            } else {
                entry = this.getEntryById(this.id)
                if (!entry) return this.$router.push({ name: 'no-entry' })
            }

            this.entry = entry
        },
        async saveEntry() {

            Swal.fire({
                title: 'Waiting pls...',
                allowOutsideClick: false
            })
            Swal.showLoading()

            const picture = await uploadImage( this.file )

            this.entry.picture = picture

            if (this.entry.id) {
                await this.updateEntry(this.entry)
            } else {
                let newId = await this.createEntry(this.entry)
                this.$router.push({ name: 'entry', params: { id: newId } })
            }
            
            this.file = null
            Swal.fire('Saved!', 'Entry saved successfully')
        },
        async onDeleteEntry() {

            const { isConfirmed } = await Swal.fire({
                title: 'Are you sure to delete?',
                text: 'Once removed, you can\'t recovery',
                showDenyButton: true,
                confirmButtonText: 'Yes, I\'m sure'
            })

            if (isConfirmed) {
                Swal.fire({
                    title: 'Waiting pls...',
                    allowOutsideClick: false
                })
                Swal.showLoading()

                await this.deleteEntry(this.entry.id)
                this.$router.push({ name: 'no-entry' })

                Swal.fire('Deleted!', '', 'success')
            }

        },

        onSelectedImage(event) {
            const file = event.target.files[0];

            if (!file) {
                this.localImage = null
                this.file = null
                return
            }

            this.file = file
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )

        },
        onSelectImage() {
            this.$refs.imageSelector.click();
        }
    },
    created() {
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>
textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
        outline: none;
    }
}

img {
    bottom: 150px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
    height: 25%;
    position: fixed;
    right: 20px;
    width: 25%;
    widows: 200px;
}
</style>