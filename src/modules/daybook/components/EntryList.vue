<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2 pb-2">
            <input type="text" placeholder="Search Entry" class="form-control">
        </div>

        <div class="entry-scrollarea">
            <h2 v-for="item in 10" :key="item">
                <Entry />
            </h2>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    components: {
        Entry: defineAsyncComponent(() => import('./EntryComponent.vue'))
    }
}
</script>

<style lang="scss" scoped>
    // input {
    //     height: px;
    // }

    .entry-list-container {
        border-right: 1px solid #2C3E50;
        height: calc( 100px - 56px );
    }

    .entry-scrollarea {
        height: calc( 100vh - 120px );
        overflow: scroll;
    }
</style>