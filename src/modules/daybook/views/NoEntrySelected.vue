<template>
    <div class="d-flex justify-content-center">
        <h1 class="align-self-center">Nothing has been selected</h1>
    </div>

    <Fab
        @on:click="createNewEntry"
    />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    name: 'NoEntrySelected',
    components: {
        Fab: defineAsyncComponent(() => import('../components/FabComponent.vue'))
    },
    methods: {
        createNewEntry() {
            this.$router.push({ name: 'entry', params: { id: 'new'} })
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    height: 100%;
}
</style>